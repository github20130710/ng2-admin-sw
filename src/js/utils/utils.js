/**
 * Created by sophia.wang on 17/4/13.
 */
const Utils = {
    // 生成指定个数的随机字符串
    randomChar: function(number) {
        var  x="0123456789abcdefghijklmnopqrstuvwxyz";
        var  tmp="";
        for(var i=0; i<number; i++)  {
            tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
        }
        return tmp;
    },

    validIp: function (addr){
        if(!addr || addr=='')   return;
        var reg = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

        if(reg.exec(addr)!=null) {
            if(RegExp.$1<1 || RegExp.$1>255)    return false;
            if(RegExp.$2<0 || RegExp.$2>255)    return false;
            if(RegExp.$3<0 || RegExp.$3>255)    return false;
            if(RegExp.$4<0 || RegExp.$4>255)    return false;
            if(RegExp.$1==0 && RegExp.$2==0 && RegExp.$3==0 && RegExp.$4==0)    return false;
        } else {
            return false;
        }
        return true;
    },
    /**
     * 判断两个IP地址是否在同一个网段
     * @param addr1 网段一
     * @param addr2 网段二
     * @param mask 子网掩码
     * @returns {boolean} 是否是同一个网段
     */
    isIPAddressInSame: function(addr1, addr2, mask){
        //各项参数不能为空
        if(!addr1 || !addr2 || !mask){
            return false;
        }

        //将网段拆开,进行比对
        var res1 = [], res2 = [];
        addr1 = addr1.split(".");
        addr2 = addr2.split(".");
        mask = mask.split(".");
        for(var i = 0,len = addr1.length; i < len ; i++){
            res1.push(parseInt(addr1[i]) & parseInt(mask[i]));
            res2.push(parseInt(addr2[i]) & parseInt(mask[i]));
        }
        if(res1.join(".") == res2.join(".")){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 判断两个IP范围是否重叠(这里不考虑子网掩码)
     * @param ipr1 IP范围一
     * @param ipr2 IP范围一
     */
    isIpRangeOverlap: function(ipr1, ipr2){
        if(!ipr1 || !ipr2)  return false;

        var start1=ipr1.startIp, end1=ipr1.endIp, mask1=ipr1.netmask,
            start2=ipr2.startIp, end2=ipr2.endIp, mask2=ipr2.netmask;

        //若两个ip范围的netmask不一致,则不重叠
        if(mask1!=mask2)    return false;

        //若两个ip范围的netmask一致,则判断始终ip是否重叠
        var start1=start1.split('.'), start2=start2.split('.'),
            end1=end1.split('.'), end2=end2.split('.');

        //判断两个ip的差异位置 并返回(无差异,即完全相同,返回-1)
        var diffIndex = function(ip1, ip2){
            for(var i=0; i<ip1.length; i++){
                if(ip1[i]!=ip2[i])    return i;
            }
            return -1;
        };
        //判断始终是否重叠.重叠返回true,不重叠返回false
        var isOverlap = function(start1, end1, start2, end2){
            if(start1==start2){
                return true;
            } else if(start1>start2){
                if(start1<=end2)    return true;
            } else if(start1<start2){
                if(end1>=start2)    return true;
            }
            return false;
        };
        //根据差异索引位置判断是否重叠
        var startDiffIndex = diffIndex(start1, start2);
        if(startDiffIndex == -1){
            return true;
        } else {
            var length = start1.length;
            var m = length -1;
            var _start1=start1[length-1], _end1=end1[length-1], _start2=start2[length-1], _end2=end2[length-1];
            for(var i=startDiffIndex; i<length; i++){
                m = m-i;
                _start1 += start1[i]*255*m;
                _end1 += end1[i]*255*m;
                _start2 += start2[i]*255*m;
                _end2 += end2[i]*255*m;
            }
            return isOverlap(_start1, _end1, _start2, _end2);
        }
    },
    validDomain: function validDomain(e){
        if(!e || e=='') return;

        var reg = /^[a-zA-Z0-9-u4e00-u9fa5ufe30-uffa0]+$/;
        var reg2 = /^-/;    //不以-开头
        var reg3 = /-$/;    //不以-结尾
        if(e.length < 2 && e.length > 67) {
            return false;
        } else if(reg.test(e) || reg2.test(e) || reg3.test(e)){
            return false;
        }
        return true;
    }
};