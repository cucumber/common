export default (
  status: 'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED'
): string => {
  return status.toLowerCase()
}
