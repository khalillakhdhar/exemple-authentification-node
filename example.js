const chaine="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTYwYzQwNTk0MGY1MDAwMWY1YzIyYSIsImlhdCI6MTcwOTU4MTE3MiwiZXhwIjoxNzA5NjY3NTcyfQ.siGUk7pLdIAQgvWYGoG5thOeYTl-IcRCOz5K9iiUgRM"
const token = chaine.split(' ')[1];
console.log(token)