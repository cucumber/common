# Cucumber Funding Application - Sovereign Tech Fund

## Proposed Narrative Structure

### Executive Summary: Strengthening the Testing Infrastructure of Open Source Software

Cucumber is foundational testing infrastructure used by thousands of organizations worldwide to ensure software quality through Behavior-Driven Development (BDD). The work outlined in this proposal addresses critical gaps that affect developer productivity, test result reliability, and the long-term sustainability of this essential public infrastructure.

---

## Theme 1: Ensuring Data Integrity in Development Toolchains

**Issues: #78, #77, #40, #328**

### The Problem

Cucumber's formatting and parsing tools contain bugs that silently corrupt or delete user data. When developers save their test files, malformed tables disappear entirely (#78), escape characters are incorrectly introduced (#77), and range expressions like "1 - 15" are misparsed (#328). These aren't minor annoyances—they represent **data loss in version control** and **unreliable test generation**, undermining trust in the entire toolchain.

### Public Good Outcome

- **Prevents data loss** affecting thousands of developers managing test suites
- **Improves reliability** of automated test generation, reducing technical debt
- **Builds trust** in open-source testing infrastructure by eliminating silent corruption

### Technical Scope

- Fix formatter bugs causing data deletion and character escape issues
- Resolve expression parsing logic for common patterns
- Add comprehensive test coverage to prevent regressions

---

## Theme 2: Modern Language Support for Diverse Development Ecosystems

**Issues: #1829, #2934, #2216, #3**

### The Problem

Despite Kotlin's rise as a modern JVM language (officially supported by Google for Android), Cucumber lacks native Kotlin support, forcing developers into workarounds that don't leverage the language's strengths. The inability to auto-generate Kotlin step definitions makes adoption "hard to sell to dev teams" (issue #1829). Meanwhile, Python developers lack tooling to programmatically generate feature files from parsed documents (#3), limiting automation possibilities.

### Public Good Outcome

- **Expands access** to BDD practices across modern programming communities
- **Reduces friction** for teams adopting testing best practices
- **Enables automation** workflows for feature file generation and maintenance
- **Supports polyglot teams** working across multiple language ecosystems

### Technical Scope

- Implement native Kotlin backend with lambda-based step definitions
- Document Kotlin hook patterns (BeforeAll/AfterAll workarounds)
- Add custom PrintStream support for flexible output routing
- Create Python feature file generation utilities

---

## Theme 3: Transparency Through Enhanced Test Reporting

**Issues: #2272, #2276, #2281, #414**

### The Problem

When tests fail, developers need clear, complete information about what went wrong. Currently, undefined step snippets aren't available in message-based formatters (#2272), global test artifacts (like API logs) can't be attached to reports (#2276), and critical test-run-level exceptions are inconsistently displayed (#2281). Meanwhile, HTML reports are so bloated with redundant data that they're slow to load and impractical for large test suites (#414).

### Public Good Outcome

- **Improves debuggability** of CI/CD pipelines for all Cucumber users
- **Reduces time-to-resolution** for test failures in production systems
- **Enhances accessibility** of test reports through smaller file sizes and faster loading
- **Enables better observability** for teams running distributed test suites

### Technical Scope

- Add snippet messages to the protocol schema
- Support attachments in BeforeAll/AfterAll hooks
- Standardize exception display across all formatters
- Optimize HTML reports by pre-computing results and reducing message stream size

---

## Theme 4: Cross-Implementation Consistency and Quality Standards

**Issues: #59, #106**

### The Problem

Cucumber maintains implementations across multiple languages (Java, JavaScript, Ruby, Python), but inconsistent testing means bugs can exist in one implementation while others work correctly. The Java implementation doesn't validate against the standard test corpus (#59), creating potential for divergence. Meanwhile, formatter behavior around metadata tags varies unpredictably, breaking workflows for teams using tags for traceability to requirements systems (#106).

### Public Good Outcome

- **Ensures reliability** across all language implementations
- **Prevents fragmentation** of the Cucumber ecosystem
- **Enables trust** for organizations standardizing on Cucumber across polyglot codebases
- **Supports regulatory compliance** workflows requiring requirements traceability

### Technical Scope

- Add parameterized tests validating Java implementation against standard corpus
- Implement configurable tag formatting preserving line breaks for metadata
- Share test suites across language implementations

---

## Theme 5: Architectural Sustainability and Security Responsiveness

**Issues: #3034, #2745**

### The Problem

Cucumber currently "shades" (embeds) the Jackson JSON library into its core, which creates a critical bottleneck: when Jackson releases security patches, **end users cannot upgrade independently**—they must wait for Cucumber to update first. This pattern extends response times for security vulnerabilities. Additionally, the current architecture prevents scenarios from accessing suite-level configuration, forcing teams into awkward ThreadLocal workarounds that complicate multi-browser testing scenarios.

### Public Good Outcome

- **Reduces security vulnerability windows** by enabling independent dependency updates
- **Simplifies license compliance** by removing dual-licensed embedded code
- **Improves architectural flexibility** for test suite configuration
- **Supports modern testing patterns** (parallel execution, parameterized test suites)

### Technical Scope

- Refactor Jackson to optional dependency with graceful fallback
- Add Gson support as alternative JSON implementation
- Redesign RuntimeOptions to support on-demand configuration access
- Enable scenarios to query suite-level parameters

---

## Cross-Cutting Impact: Systemic Improvements to Testing Infrastructure

These five themes aren't isolated improvements—they represent systemic enhancements to testing infrastructure used throughout the open-source ecosystem:

1. **Developer Productivity**: Reducing time wasted on tool bugs and workarounds
2. **Software Quality**: Better reporting and debugging capabilities improve test effectiveness
3. **Security Posture**: Faster response to dependency vulnerabilities
4. **Ecosystem Health**: Cross-language consistency prevents fragmentation
5. **Adoption & Accessibility**: Modern language support lowers barriers to BDD practices

---

## Alignment with Sovereign Tech Fund Priorities

This work directly supports STF's mission to strengthen digital infrastructure:

- **Resilience**: Fixes critical bugs that erode trust in testing tools
- **Security**: Enables faster security patch adoption through dependency decoupling
- **Maintainability**: Establishes test suites ensuring cross-implementation quality
- **Public Good**: Benefits thousands of organizations relying on Cucumber for software quality assurance

Testing infrastructure is invisible when it works but catastrophic when it fails. This proposal addresses accumulated technical debt that affects developer productivity and software reliability across the entire open-source ecosystem.

---

## Issue Reference Table

| Issue | Repository | Title | Theme |
|-------|------------|-------|-------|
| #78 | gherkin-utils | Formatter removes malformed tables | Theme 1 |
| #77 | gherkin-utils | Formatter introduces escapes on standalone backslashes | Theme 1 |
| #40 | gherkin-utils | Formatter introduces newlines in awkward places with comments | Theme 1 |
| #328 | cucumber-expressions | The minus sign is interpreted as a double | Theme 1 |
| #1829 | cucumber-jvm | Support step definitions written in Kotlin | Theme 2 |
| #2934 | cucumber-jvm | Use of BeforeAll/AfterAll in Kotlin-based Cucumber suite | Theme 2 |
| #2216 | cucumber-jvm | Allow to specify alternative to System.out via Runtime.builder() | Theme 2 |
| #3 | gherkin-utils | Generate a feature file from a parsed document | Theme 2 |
| #2272 | common | Add suggestions/snippets to the model | Theme 3 |
| #2276 | common | Support attachments in BeforeAll/AfterAll hooks | Theme 3 |
| #2281 | common | Show TestRunFinished.exception consistently in formatters | Theme 3 |
| #414 | html-formatter | HTML report are really heavy as they embed the whole messages stream | Theme 3 |
| #59 | gherkin-utils | Test java and javascript implementation against test/data/good | Theme 4 |
| #106 | gherkin-utils | Formatter: Allow line breaks between tags | Theme 4 |
| #3034 | cucumber-jvm | Consider making Jackson an optional non-shaded dependency | Theme 5 |
| #2745 | cucumber-jvm | Allow scenarios to access suite configuration parameters | Theme 5 |
