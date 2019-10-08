#include "pickle_id_creator.h"
#include <stdlib.h>
#include <stdint.h>
#include "unicode_utilities.h"

static uint32_t read_uint32_from_buffer_big_endian(unsigned char* buffer);

static void write_uint32_to_buffer_little_endian(unsigned char* buffer, uint32_t value);

static void write_uint32_to_buffer_big_endian(unsigned char* buffer, uint32_t value);

static void write_uint64_to_buffer_big_endian(unsigned char* buffer, uint64_t value);

const Pickle_Id_Data* Pickle_Id_Data_new(const wchar_t* source) {
    Pickle_Id_Data* pickle_id_data = (Pickle_Id_Data*)malloc(sizeof(Pickle_Id_Data));
    pickle_id_data->buffer_size = 128;
    pickle_id_data->message_buffer = (unsigned char*)malloc(pickle_id_data->buffer_size * sizeof(unsigned char));
    pickle_id_data->source_size = 0;
    pickle_id_data->message_size = 0;
    if (source) {
        int i;
        for (i = 0; i < wcslen(source); ++i) {
            /* In addition to the 6bytes an utf encoded code point can use, there need to be room for */
            /* two pickle locations: 2*2*4bytes                                                       */
            /* the starting byte of the sha1 suffix of the message: 0x80                              */
            /* the 8bytes for the original message size                                               */
            /* 6 + 2*2*4 + 1 + 8 = 31bytes                                                            */
            if (pickle_id_data->source_size >= pickle_id_data->buffer_size - 31) {
                pickle_id_data->buffer_size *= 2;
                pickle_id_data->message_buffer = (unsigned char*)realloc(pickle_id_data->message_buffer, pickle_id_data->buffer_size * sizeof(unsigned char));
            }
            pickle_id_data->source_size += UnicodeUtilities_print_wide_character_to_utf8_buffer(&pickle_id_data->message_buffer[pickle_id_data->source_size], source, i);
            if (UnicodeUtilities_is_utf16_surrogate(source[i])) {
                ++i;
            }
        }
    }
    return pickle_id_data;
}

void Pickle_Id_Data_delete(const Pickle_Id_Data* pickle_id_data) {
    if (!pickle_id_data) {
        return;
    }
    if (pickle_id_data->message_buffer) {
        free((void*)pickle_id_data->message_buffer);
    }
    free((void*)pickle_id_data);
}

const unsigned char* Pickle_Id_calculate(const Pickle_Id_Data* pickle_id_data, const PickleLocations* locations) {
    /* Add the pickle locations to the message */
    unsigned long message_size = pickle_id_data->source_size;
    int n;
    for (n = 0; n < locations->location_count; ++n) {
        write_uint32_to_buffer_little_endian(&pickle_id_data->message_buffer[message_size], locations->locations[n].line);
        message_size += 4;
        write_uint32_to_buffer_little_endian(&pickle_id_data->message_buffer[message_size], locations->locations[n].column);
        message_size += 4;
    }

    /* Add the sha1 suffix to the message */
    uint64_t original_bit_size = 8 * message_size;
    pickle_id_data->message_buffer[message_size++] = 0x80;
    while (message_size % 64 != 56) {
        pickle_id_data->message_buffer[message_size++] = 0x00;
    }
    write_uint64_to_buffer_big_endian(&pickle_id_data->message_buffer[message_size], original_bit_size);
    message_size += 8;

    /* Perform the sha1 calculation */
    uint32_t h0 = 0x67452301;
    uint32_t h1 = 0xefcdab89;
    uint32_t h2 = 0x98badcfe;
    uint32_t h3 = 0x10325476;
    uint32_t h4 = 0xc3d2e1f0;
    int chunk;
    for (chunk = 0; chunk < message_size / 64; ++chunk) {
        uint32_t words[80];
        for (n = 0; n < 16; ++n) {
            int start_index = (64 * chunk) + (4 * n);
            words[n] = read_uint32_from_buffer_big_endian(&pickle_id_data->message_buffer[start_index]);
        }
        uint32_t temp;
        for (n = 16; n < 80; ++n) {
            temp = words[n - 3] ^ words[n - 8] ^ words[n - 14] ^ words[n - 16];
            words[n] = (temp << 1) | (temp >> 31);
        }
        uint32_t a = h0;
        uint32_t b = h1;
        uint32_t c = h2;
        uint32_t d = h3;
        uint32_t e = h4;
        for (n = 0; n < 80; ++n) {
            uint32_t f, k, t;
            if (n < 20) {
               f = (b & c) | ((~b) & d);
               k = 0x5a827999;
            }
            else if (n < 40) {
                f = b ^ c ^ d;
                k = 0x6ed9eba1;
            }
            else if (n < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8f1bbcdc;
            }
            else {
                f = b ^ c ^ d;
                k = 0xca62c1d6;
            }
            t = ((a << 5) | (a >> 27)) + f + e + k + words[n];
            e = d;
            d = c;
            c = (b << 30) | (b >> 2);
            b = a;
            a = t;
        }
        h0 += a;
        h1 += b;
        h2 += c;
        h3 += d;
        h4 += e;
    }
    unsigned char* id;
    id = (unsigned char*)malloc(20);
    write_uint32_to_buffer_big_endian(id, h0);
    write_uint32_to_buffer_big_endian(&id[4], h1);
    write_uint32_to_buffer_big_endian(&id[8], h2);
    write_uint32_to_buffer_big_endian(&id[12], h3);
    write_uint32_to_buffer_big_endian(&id[16], h4);
    return id;
}

static uint32_t read_uint32_from_buffer_big_endian(unsigned char* buffer) {
    return (buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3];
}

static void write_uint32_to_buffer_little_endian(unsigned char* buffer, uint32_t value) {
    buffer[0] = value & 0x000000ff;
    buffer[1] = (value & 0x0000ff00) >> 8;
    buffer[2] = (value & 0x00ff0000) >> 16;
    buffer[3] = (value & 0xff000000) >> 24;
}

static void write_uint32_to_buffer_big_endian(unsigned char* buffer, uint32_t value) {
    buffer[0] = (value & 0xff000000) >> 24;
    buffer[1] = (value & 0x00ff0000) >> 16;
    buffer[2] = (value & 0x0000ff00) >> 8;
    buffer[3] = value & 0x000000ff;
}

static void write_uint64_to_buffer_big_endian(unsigned char* buffer, uint64_t value) {
    write_uint32_to_buffer_big_endian(buffer, (value >> 32) & 0xffffffff);
    write_uint32_to_buffer_big_endian(&buffer[4], value & 0xffffffff);
}
