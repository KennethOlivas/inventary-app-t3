function undoCapitalization(string: string): string {
  return string[0].toLowerCase() + string.slice(1);
}

export default undoCapitalization;
