function titleGenerator(title) {
  if (title) {
    document.title = `Pizza Wizard | ${title}`;
  } else {
    document.title = 'Pizza Wizard';
  }
}

export { titleGenerator };
