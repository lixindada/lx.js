/* 
 * title LX JavaScript库代码
 * author lixin
*/
// ----------------------------弹框---------------------------
/*方法说明
 *@method 方法名
 *@for 所属类名
 *@param{参数类型}参数名 参数说明
 *@return {返回值类型} 返回值说明
*/
//
(function (){
    //注册命名空间 'LX' 到window对象上  
    window['LX'] = {}  
    // 创建对象
    var config = new Object();
    config.url = "192.168.1.1";
    
    // --------------------------- 获取dom ------------------------
    /*方法说明
    *@method $()
    *@param{参数类型}参数名 参数说明
    *@return {返回值类型} 返回值说明
    */
    
    function $(){ // 获取dom
        // console.log(arguments);
        let arr = new Array();
        // console.log(arr);
        // return;
        for(let i = 0; i<arguments.length; i++){
            // console.log(arguments[i])
            arr.push(arguments[i]);
        }
        // console.log(arr);
        for(let x in arr){
            if(arr[x].substr(0,1) == "#"){
                let s = arr[x].substr(1,arr[x].length);
                let dom = document.getElementById(s);
                return dom;
            }
        }
    }
    
    // --------------------------- 阻止冒泡 ------------------------------
    /*方法说明
    *@method stopPropagation()
    *@param  e  dom本身
    *@return 没有返回值
    */

    function stopPropagation(e) {  
        e = e || window.event; 
        if(e.stopPropagation) { //W3C阻止冒泡方法  
            e.stopPropagation();  
        } else {  
            e.cancelBubble = true; //IE阻止冒泡方法  
        }  
    }  

    // ---------------------------- 弹框 ---------------------------

    function alerts(){  // 弹框
        alert(2);
        return;
    }

    // ---------------------------- 格式化时间戳 ---------------------------
    /*方法说明
    *@method formatDate()
    *@param  now 时间戳
    *@return arr 格式化的时间
    */
    
    function formatDate(now)   { 
        let time = new Date(now);
        var y=time.getFullYear();
        var m=time.getMonth()+1;
        var d=time.getDate();
        var h=time.getHours();
        var m=time.getMinutes();
        var s=time.getSeconds();
        return y+"-"+m+"-"+d+" "+h+":"+m+":"+s;     
    }     

     // ---------------------------- 字符串分割数组函数 ---------------------------
    /*方法说明
    *@method getarr()
    *@param  str 任意字符串
             len 每组字符串的长度
    *@return arr 数组
    */
    
   function getarr(str,len){
        let arr = []; // 秘钥数组置空
        for(var i = 0; i<str.length; i++){
            let strs = str.substr(i,len);
            arr.push(strs);
            // console.log(strs);
        }
        // console.log(arr);
        return arr;
    }

    // ---------------------------- 加密函数 ---------------------------
    /*方法说明
    *@method Encryption()
    *@param  key 一串32位的任何数字
             pwd 需要加密的字符
    *@return key 加密过后的秘钥
    */
    
    function Encryption(key,pwd){
        // 获取数组
        Pwdarr =  getarr(pwd,'1'); // 密码数组
        Keyarr = getarr(key,'2');  // key 数组
        endkey = OneEncryption(Keyarr,Pwdarr);  // 一级加密
        let endkeys = TwoEncryption(endkey);    // 二级加密
        // console.log(endkeys);
        // 一级加密区
        function OneEncryption(key,pwd){
            let endkey = '',len = pwd.length;
            for(var i = 0; i<key.length; i++){
                pwd[i] == undefined ? pwd[i] = "" : pwd[i] = pwd[i];
                endkey += (key[i] + pwd[i]);
            }
            endkey += ("?id="+len);
            return endkey;
        }
        //  二级加密区
        function TwoEncryption(str){
            let b = new Base64(); // 创建base64
            // console.log(b);
            let strs = str;
            let strss = b.encode(strs);  
            // console.log(b);
            // console.log(strss);
            return strss;
        }
        return endkeys;
    }

    // ---------------------------- 解密函数 ---------------------------
    /*方法说明
    *@method UnEncryption()
    *@param  str 一串由LX.js加密过的一串秘钥
    *@return key 解密完的字符串
    */
    
    function UnEncryption(str){
        let key = Decrypt(str);
        console.log(key);
        // return;
        let twokey = TwoDecrypt(key);
        // 一级解密
        function Decrypt(str){
            let b = new Base64(); // 创建base64
            let key = b.decode(str);
            return key;
        }
        // 二级解密
        function TwoDecrypt(key){
            // console.log(key);
            let of = key.indexOf('?id=');
            // console.log(of);
            // return;
            let len = key.substr(of+4);
            
            let str = key.substr(0,key.length-1),k="";
            // console.log(len)
            for(let i = 1; i<=len; i++){
                k += key.substr(3*i-1,1);
            }
            // console.log(k);
            // console.log(str,len);
            return k;
        }
        // console.log(twokey);
        return twokey;
    }

    // ---------------------------- 判断浏览器 ----------------------------------
    /*方法说明
    *@method myBrowser()
    *@param  没有参数
    *@return Chrome Chrome浏览器
    ---------FF   Firefox浏览器
    ---------Opera   Opera浏览器
    ---------Safari   Safari浏览器
    ---------IE55   ie5.5浏览器
    ---------IE6   ie6浏览器
    ---------IE7   ie7浏览器
    ---------IE8   ie8浏览器
    ---------IE9+   IE9+浏览器
    */

    function myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1; // 判断是否为Chrome浏览器
        // console.log(userAgent)
        if (isIE) {
            var IE5 = IE55 = IE6 = IE7 = IE8 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE55 = fIEVersion == 5.5;
            IE6 = fIEVersion == 6.0;
            IE7 = fIEVersion == 7.0;
            IE8 = fIEVersion == 8.0;
            if (IE55) {
                return "IE55";
            }
            if (IE6) {
                return "IE6";
            }
            if (IE7) {
                return "IE7";
            }
            if (IE8) {
                return "IE8";
            }else{
                return "IE9+"
            }
        }//isIE end
        if (isFF) {
            return "FF";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isChrome) {
            return "Chrome";
        }
        if (isSafari) {
            return "Safari";
        }
    }//myBrowser() end
    
    // ---------------------------- 正则 ----------------------------------
    
    function isRegular(text,regs){
        console.log(text,regs);
        const photoReg = /^1[3|5|8|7]\d{9}$/;
        const email = /^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/;
    }

    const regData = [{
        "name":"LX" , "funName":"$" , "fun":$ // 获取dom
    },{
        "name":"LX" , "funName":"alerts" , "fun":alerts // 弹框
    },{
        "name":"LX" , "funName":"Encryption" , "fun":Encryption // 加密函数
    },{
        "name":"LX" , "funName":"UnEncryption" , "fun":UnEncryption // 解密函数
    },{
        "name":"LX" , "funName":"stopPropagation" , "fun":stopPropagation // 阻止冒泡函数
    },{
        "name":"LX" , "funName":"myBrowser" , "fun":myBrowser // 判断浏览器
    },{
        "name":"LX" , "funName":"isRegular" , "fun":isRegular // 正则
    },{
        "name":"LX" , "funName":"formatDate" , "fun":formatDate // 格式化时间戳
    }];
    registerFun(regData);
    //把$函数注册到 'LX'命名空间中
    function registerFun(data){
        for (const i in data) {
            let name = data[i].name,
            funName = data[i].funName,
            fun = data[i].fun;
            window[name][funName]=fun;
        }
    }
    // window['LX']['$']=$; // 获取dom
    // window['LX']['alerts']=alerts; // 弹框
    // window['LX']['Encryption']=Encryption; // 加密函数
    // window['LX']['UnEncryption']=UnEncryption; // 解密函数
    // window['LX']['stopPropagation']=stopPropagation; // 阻止冒泡函数
    // window['LX']['myBrowser']=myBrowser; // 判断浏览器
    
})();
