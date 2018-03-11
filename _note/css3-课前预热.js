`
1. border-image 属性 有点像九妹图


2. 属性选择器
	[attr~='只要有就行']
	[attr^='开头有才行']
	[attr$='结尾有才行']


3. not伪类选择器
	li:not([attr='prop'])


4. transform: rotate(x, y, z)
  2D坐标轴固定的变换方式
		transform: rotateX(俯仰角)
		transform: rotateY(偏航角)
		transform: rotateZ(翻滚角)

	3D以xyz形成的矢量为轴 旋转angle°
		transform: rotate3D(→x, →y, →z, angle)

	transform: rotateX(x) rotateY(y)不等价, 后者的坐标系是固定的. 前者坐标轴变换了


5. transform: scale(abs)
	2D方式scale(x, y)

	3D方式scale3D(x, y, z)


6. skew(x, y)
	以x,y轴斜切 响应角度


7. translate(x, [y])
	平移绝对值, 或者平移相对自己的百分比


8. transform 实际是坐标轴变换 且变换有先后关系, 每次变化都是变化坐标轴


9. transform-origin 改变原点


10. transition: attr during timing delay[, another]
	timing 可以是 cube-beizer(a,b,c,d)


11. animation: name during timing delay times direction(normal, reverse alternate) play-state
	alternate 奇数次正向 偶数次反向
	forwards, backwards, both

	animation-play-state: paused|running 播放或暂停
`