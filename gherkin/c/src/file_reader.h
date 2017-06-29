#ifndef GHERKIN_FILE_READER_H_
#define GHERKIN_FILE_READER_H_

#include <wchar.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct FileReader FileReader;

FileReader* FileReader_new(const char* const file_name);

const wchar_t* FileReader_read(FileReader* file_reader);

void FileReader_delete(FileReader* file_reader);

#ifdef __cplusplus
}
#endif

#endif /* GHERKIN_FILE_READER_H_ */
