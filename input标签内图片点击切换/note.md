## visible_1.html

这次实验是想实现一个密码类型的input，并且通过点击“伪元素”眼睛来切换密码可视与否，但是很可惜，经过一轮试验只能宣告失败了，原因如下：
1. input 不能挂伪元素，要想解决这个方法只能在input外面套一个div，在div上挂伪元素，譬如我在这次实验中的div挂了一个``::after``。
2. ``Window.getComputedStyle(pwdBox,"::after");``获取的是**只读**的style,并不能借此直接操作样式。