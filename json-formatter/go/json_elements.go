package json

type jsonFeature struct {
	Description string                `json:"description"`
	Elements    []*jsonFeatureElement `json:"elements"`
	ID          string                `json:"id"`
	Keyword     string                `json:"keyword"`
	Line        uint32                `json:"line"`
	Name        string                `json:"name"`
	URI         string                `json:"uri"`
	Tags        []*jsonTag            `json:"tags,omitempty"`
}

type jsonFeatureElement struct {
	Description string      `json:"description"`
	ID          string      `json:"id,omitempty"`
	Keyword     string      `json:"keyword"`
	Line        uint32      `json:"line"`
	Name        string      `json:"name"`
	Before      []*jsonStep `json:"before,omitempty"`
	Steps       []*jsonStep `json:"steps"`
	After       []*jsonStep `json:"after,omitempty"`
	Type        string      `json:"type"`
	Tags        []*jsonTag  `json:"tags,omitempty"`
}

type jsonStep struct {
	Keyword    string              `json:"keyword,omitempty"`
	Line       uint32              `json:"line,omitempty"`
	Name       string              `json:"name,omitempty"`
	Result     *jsonStepResult     `json:"result"`
	Match      *jsonStepMatch      `json:"match,omitempty"`
	DocString  *jsonDocString      `json:"doc_string,omitempty"`
	Rows       []*jsonDatatableRow `json:"rows,omitempty"`
	Embeddings []*jsonEmbedding    `json:"embeddings,omitempty"`
	Output     []string            `json:"output,omitempty"`
}

type jsonDocString struct {
	ContentType string `json:"content_type"`
	Line        uint32 `json:"line"`
	Value       string `json:"value"`
}

type jsonDatatableRow struct {
	Cells []string `json:"cells"`
}

type jsonStepResult struct {
	Duration     uint64 `json:"duration,omitempty"`
	Status       string `json:"status"`
	ErrorMessage string `json:"error_message,omitempty"`
}

type jsonStepMatch struct {
	Location string `json:"location"`
}

type jsonTag struct {
	Line uint32 `json:"line"`
	Name string `json:"name"`
}

type jsonEmbedding struct {
	Data     string `json:"data"`
	MimeType string `json:"mime_type"`
}
