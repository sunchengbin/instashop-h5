/**
 * Created by chenghaolan on 16/11/28.
 */
/**
 * Created by sunchengbin on 16/6/2.
 */
define(['config','base'],function(Config,Base){
    var Debug = Base.others.getUrlPrem('_debug_env');

    var SHAKE_THRESHOLD = 3000;
    var last_update = 0;
    var x = y = z = last_x = last_y = last_z = 0;
    function init() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        } else {
            alert('not support mobile event');
        }
    }



    var Debug = {
        SHAKE_THRESHOLD:3000,
        last_update:0,
        x:0,
        y:0,
        z:0,
        last_x:0,
        last_y:0,
        last_z:0,
        debugInfo:{},
        init:function(){
            var _this = this;
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', _this.deviceMotionHandler, false);
            } else {
                console.info("not support devicemotion event")
            }
        },
        showDebug:function(debugInfo){
            this.debugInfo = debugInfo;
        },
        deviceMotionHandler : function(eventData){
            var _this = this;
            var acceleration = eventData.accelerationIncludingGravity;
            var curTime = new Date().getTime();
            if ((curTime - last_update) > 100) {
                var diffTime = curTime - _this.last_update;
                _this.last_update = curTime;
                _this.x = acceleration.x;
                _this.y = acceleration.y;
                _this.z = acceleration.z;
                var speed = Math.abs(_this.x + _this.y + _this.z - _this.last_x - _this.last_y - _this.last_z) / diffTime * 10000;

                if (speed > SHAKE_THRESHOLD) {
                    this.debugInfo
                }
                _this.last_x = _this.x;
                _this.last_y = _this.y;
                _this.last_z = _this.z;
            }
        }
    };
    return Debug;
})

