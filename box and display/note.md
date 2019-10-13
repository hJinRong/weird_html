## display_1.html

这一页展示了**外部盒子在display属性不同，内部盒子宽度比外部盒子宽度大**的情况下，盒子模型是如何变化的：

1. 有两个类似的，当外部盒子为``display:inline;``，外部盒子哪怕原来的高度比内部更高，它的高度最后都会和内部盒子保持一致。
2. 当为``display:contents；``时，盒子模型的宽度与高度都置为 0 , 那么应该说,内部盒子宽度超出170px,高度超出70px,为外部盒子添加``overflow: hidden;``将会完全隐藏内部盒子呀，可是经过实验，内部盒子没有被隐藏，从结果上看，外部盒子更像在DOM树中完全不存在。  
摘自MDZ: These elements don't produce a specific box by themselves. They are replaced by their pseudo-box and their child boxes. Please note that the CSS Display Level 3 spec defines how the contents value should affect "unusual elements" — elements that aren’t rendered purely by CSS box concepts such as replaced elements. See Appendix B: Effects of display: contents on Unusual Elements for more details.

1. 当``display:flex``时，哪怕内部盒子比外部更加宽，但最后内部盒子的宽度和外部盒子宽度保持一致，从开发者工具效果来看，内部盒子非显式地被添加了``flex-shrink:1;``属性。
2. 摘自MDN：  Browsers that support the two value syntax, on finding the outer value only, such as when display: block or display: inline is specified, will set the inner value to flow. This will result in expected behavior; for example if you specify an element to be block, you would expect that the children of that element would participate in block and inline normal flow layout.