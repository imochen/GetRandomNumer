### GetRandomNumber
> GetRandomNumber是一个获取随机数的方法。它允许你获取指定范围内，指定数目的随机数，并且可以控制是否允许重复。代码内自带debug代码，你可以直接在代码中开启。

@param

```javascript
"min" : (int)起始值，最小值可以取到这个值，默认为0；
"max" : (int)终止值，取不到这个值，默认为10；
"num" : (int)指定数目，默认为1；
"repeat" : (bool)默认为false,允许重复。为true的时候，取值不允许重复
"debug" : (bool)默认为false。为true时开启debug模式
