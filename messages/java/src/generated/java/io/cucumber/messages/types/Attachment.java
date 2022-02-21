package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Attachment {
    private final String body;
    private final AttachmentContentEncoding contentEncoding;
    private final String fileName;
    private final String mediaType;
    private final Source source;
    private final String testCaseStartedId;
    private final String testStepId;
    private final String url;

    public Attachment(
        String body,
        AttachmentContentEncoding contentEncoding,
        String fileName,
        String mediaType,
        Source source,
        String testCaseStartedId,
        String testStepId,
        String url
    ) {
        this.body = requireNonNull(body, "Attachment.body cannot be null");
        this.contentEncoding = requireNonNull(contentEncoding, "Attachment.contentEncoding cannot be null");
        this.fileName = fileName;
        this.mediaType = requireNonNull(mediaType, "Attachment.mediaType cannot be null");
        this.source = source;
        this.testCaseStartedId = testCaseStartedId;
        this.testStepId = testStepId;
        this.url = url;
    }

    public String getBody() {
        return body;
    }

    public AttachmentContentEncoding getContentEncoding() {
        return contentEncoding;
    }

    public Optional<String> getFileName() {
        return Optional.ofNullable(fileName);
    }

    public String getMediaType() {
        return mediaType;
    }

    public Optional<Source> getSource() {
        return Optional.ofNullable(source);
    }

    public Optional<String> getTestCaseStartedId() {
        return Optional.ofNullable(testCaseStartedId);
    }

    public Optional<String> getTestStepId() {
        return Optional.ofNullable(testStepId);
    }

    public Optional<String> getUrl() {
        return Optional.ofNullable(url);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Attachment that = (Attachment) o;
        return 
            body.equals(that.body) &&         
            contentEncoding.equals(that.contentEncoding) &&         
            Objects.equals(fileName, that.fileName) &&         
            mediaType.equals(that.mediaType) &&         
            Objects.equals(source, that.source) &&         
            Objects.equals(testCaseStartedId, that.testCaseStartedId) &&         
            Objects.equals(testStepId, that.testStepId) &&         
            Objects.equals(url, that.url);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            body,
            contentEncoding,
            fileName,
            mediaType,
            source,
            testCaseStartedId,
            testStepId,
            url
        );
    }

    @Override
    public String toString() {
        return "Attachment{" +
            "body=" + body +
            ", contentEncoding=" + contentEncoding +
            ", fileName=" + fileName +
            ", mediaType=" + mediaType +
            ", source=" + source +
            ", testCaseStartedId=" + testCaseStartedId +
            ", testStepId=" + testStepId +
            ", url=" + url +
            '}';
    }
}
