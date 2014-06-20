//给定范围内获取指定数目的随机数，包含前不包含后
var ___get__random = function( option ) {

	var _min = option.min || 0,
		_max = option.max || 10,
		_num = option.num || 0,
		_repeat = option.repeat || false,
		_debug = option.debug || false;
		_reslut = [],
		_t = '\u8017\u65F6';
	//对于数据类型都没传对的，直接抛出异常
	if( isNaN(_min) || isNaN(_max) || isNaN(_num) || (typeof _repeat != 'boolean') || (typeof _debug != 'boolean') )
	{
		_debug&&console.error('\u4F20\u5165\u6570\u636E\u7C7B\u578B\u9519\u8BEF.');
		return false;
	}

	//对于取值范围没值的，同样抛出异常
	if( _min >= _max ){
		_debug&&console.error('\u53D6\u503C\u8303\u56F4\u5F02\u5E38.');
		return false;
	}

	//容错处理,取的数目比范围里面的值还多。按排序处理。
	_num = ( _max - _min  < _num ) ? _max - _min  : _num ;

	//让我们愉快的写一个取单个随机数的方法
	var __get_a_num = function(){
		return Math.floor(Math.random() * (_max - _min) + _min );
	}
	//下面我们可能需要一个检测函数，这里先写出来
	var __test_result = function( array , number ){
		var string = "#" + array.join("#") + "#";
		return string.indexOf("#"+number+"#") > -1 ? true : false;
	}
	//递归方法，检测存在则继续查询
	var __recursive = function(){
		var _random = __get_a_num();
		if( !__test_result( _reslut , _random ) ){
			_reslut.push( _random );
		}
		else{
			__recursive();
		}
	}
	var __get_all_num = function(){
		var i = 0 ,
			length = _max - _min,
			array = [];
		for( ; i < length; i++ ){
			array.push( i + _min );
		}
		return array;
	}
	//允许重复，这简直太好办了
	if( !_repeat ){

		_debug&&console.time(_t);

		for( var i = 0 ; i < _num ; i++ ){
			var _random = __get_a_num();
			_reslut.push( _random );
		}

		_debug&&console.timeEnd(_t);

		return _reslut;
	}
	else{
		//不允许重复的情况，略微复杂了点,首选我们判断一下要取的比例
		var _proportion = _num / (_max - _min) ;
		/*拿到比例之后我们分三种情况
			x=1,
			0<x<=0.5,
			0.5<x<1;
		*/
		if( _proportion <= 0.5 ){

			_debug&&console.time(_t);

			for( var i = 0 ; i < _num ; i++ ){
				__recursive();
			}

			_debug&&console.timeEnd(_t);

		}
		else if( 1 > _proportion > 0.5){
			//这种情况防止递归挂掉，我们先拿到所有数组排序
			_debug&&console.time(_t);

			var _all_reslut = __get_all_num();
			_all_reslut.sort(function(){
				return Math.random() - 0.5 ;
			})

			//然后我们看下有多少个没有取
			var _remaining = _max - _min - _num ;

			for( var i = 0 ; i < _remaining ; i++ ){
				__recursive();
			}

			var _temp_arr = [];

			for( var j = 0 ; j < _all_reslut.length; j++ ){
				var _r = _all_reslut[j];
				var c = 0 ;
				for( var k = 0 ; k < _reslut.length; k++ ){
					if( _r == _reslut[k] ){
						c++;
					}
				}
				if( c == 0 ){
					_temp_arr.push( _r );
				}

			}

			_reslut = _temp_arr;


			_debug&&console.timeEnd(_t);
		}
		else{
			// 100个里面取100个，这tm递归直接挂了。所以，我们直接排序。
			_debug&&console.time(_t);

			var _reslut = __get_all_num();
			_reslut.sort(function(){
				return Math.random() - 0.5 ;
			})

			_debug&&console.timeEnd(_t);
		}
		return _reslut;
	}
}

var a = ___get__random({
	min : 0,
	max : 10,
	num : 2,
	repeat : true ,
	debug : true
});