import * as Cook from "@cooklang/cooklang-ts";

const source = `
>> course: dinner
Then add @salt and @ground black pepper{} to taste.
`;

console.log(JSON.stringify(new Cook.Parser().parse(source), null, 4));
