---
title: C Coding Style
date: 2021-11-08 09:53:36
tags: misc
---

> This page is generated for website testing purposes

### Text Width

There is no set code width, so you do not need to break code lines. However, you should not overdo it, ~100 characters should be enough.

### Naming

- Name structures in `PascalCase`
- Name variables and functions in `snake_case`

### Indentation

- Use tabs not space
- Tabs are 8 characters

This style of indentation clearly defines where a block of code starts and ends especially when you have been looking at your screen for a long period of time

For `switch-case` statement, align the switch and its subordinate case labels in the same column. For example:

``` c
switch (suffix) {
case 'a':
      break;
case 'b':
      break;
case 'c':
      break;
default:
}
```

### Spacing

Use a space after these keywords: `if`, `switch`, `case`, `for`, `do`, `while`

But not after `sizeof`, `typeof`, `alignof`, or `__attribute__`.

When declaring pointer, place the `*` adjacent to the data name or function
name like this:

``` c
char *string;
int *num(void);
void die(const char *errstr, ...);
```

Use one space around binary and ternary operators, such as these:

```
=  +  -  <  >  *  /  %  |  &  ^  <=  >=  ==  !=  ?  :
```

Do not put space after unary operators:

```
&  *  +  -  ~  !  sizeof  typeof  alignof  __attribute__  defined
```

No space after postfix/prefix increment and decrement unary operators:

```
++ --
```

And no space around the `.` and `->` structure member operators.

In addition, do not leave trailing whitespace at the end of lines

### Alignment

Use tabs for indentation and spaces for alignment. This ensures everything will line up independent of tab size. This means:

- No tabs except beginning of line.
- Use spaces - not tabs - for multiline macros

### Braces Placement

Put opening brace last on the line, and put the close brace first. This applies to all non-functional statement blocks (if, switch, for, while, do).

``` c
if (true) {
      // do x
      // do y
      // do z
}
```

However, for function, place opening brace at the beginning of the next line
like this:

``` c
int
function (int x)
{
      // body of function
}
```

Usually closing brace is empty on a line of its own except in cases where it is followed by a continuation of the same statement, such as a while in a `do-while` statement or an else in an `if-else` statement like the following:

``` c
do {
      // body of do-while loop
} while (condition);
```

and

``` c
if (x == y) {
      // do something
} else if (x > y) {
      // do something else
} else {
      // do something else
}
```

Do not place braces in situation where there is only a single statement in the block. For example:

``` c
for (condition)
      action();
```

and

``` c
if (condition)
      action();
```

and

``` c
if (condition)
        do_something();
else
        do_something_else();
```

However, this does not apply if only one branch of an `if-else` statement is a single statement. In this case, use braces in both branches like the following:

``` c
if (condition) {
        do_this();
        do_that();
} else {
        do_something_else();
}
```

### Function

- Put return type and modifiers on its own line.
- Put function name and argument list on next line.

``` c
static void
die(const char *errstr, ...)
{
      // print error message
}
```

This allows to grep for function names by simply using `grep ^functioname(`

### Commenting

- Use `/* comment */` for comments
- Use `// comment` for local, temporary commenting of code for debugging purposes

The preferred style for long (multi-line) comments is:

``` c
/*
 * This is the preferred style for multi-line
 * comments in the Linux kernel source code.
 * Please use it consistently.
 *
 * Description:  A column of asterisks on the left side,
 * with beginning and ending almost-blank lines.
 */
 ```

## Macros, Enums and RTL

Names of macros defining constants and labels in enums are capitalized.

``` c
#define CONSTANT 0x12345
```

Enums are preferred when defining several related constants.

CAPITALIZED macro names are appreciated but macros resembling functions may be named in lower case.

Generally, inline functions are preferable to macros resembling functions.

Macros with multiple statements should be enclosed in a do - while block:

``` c
#define macrofun(a, b, c)                       \
        do {                                    \
                if (a == 5)                     \
                        do_this(b, c);          \
        } while (0)
```

Things to avoid when using macros:

1. macros that affect control flow:

``` c
#define FOO(x)                                  \
        do {                                    \
                if (blah(x) < 0)                \
                        return -EBUGGERED;      \
        } while (0)
```

is a very bad idea. It looks like a function call but exits the calling function; don’t break the internal parsers of those who will read the code.

2. macros that depend on having a local variable with a magic name:

``` c
#define FOO(val) bar(index, val)
```

might look like a good thing, but it’s confusing as hell when one reads the code and it’s prone to breakage from seemingly innocent changes.

3. macros with arguments that are used as l-values: FOO(x) = y; will bite you if somebody e.g. turns FOO into an inline function.

4. forgetting about precedence: macros defining constants using expressions must enclose the expression in parentheses. Beware of similar issues with macros using parameters.

``` c
#define CONSTANT 0x4000
#define CONSTEXP (CONSTANT | 3)
```

5. namespace collisions when defining local variables in macros resembling functions:

``` c
#define FOO(x)                          \
({                                      \
        typeof(x) ret;                  \
        ret = calc_ret(x);              \
        (ret);                          \
})
```

ret is a common name for a local variable - \__foo_ret is less likely to collide with an existing variable.

The c manual deals with macros exhaustively. The gcc internals manual also covers RTL which is used frequently with assembly language in the kernel.
