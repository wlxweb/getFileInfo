module.exports = {
	singleQuote: true, // 字符串使用单引号
	semi: true, // 每行末尾自动添加分号
	tabWidth: 2, // tab缩进大小,默认为2
	useTabs: false, // 使用tab缩进，默认false
	printWidth: 1000, // 换行长度，默认80
	jsxBracketSameLine: true, // 设置为true时,将多行JSX元素的 > 放在最后一行的末尾，而不是单独放在下一行
	trailingComma: "all", //多行时尽可能打印尾随逗号
	bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
	arrowParens: "avoid" //单参数箭头函数参数周围使用圆括号-eg: (x) => x
};
