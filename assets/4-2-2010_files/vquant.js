var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

if(!__qcvideo){var __qcvideo={videos:new Object(),sendEvent:function(e){e.ls=new Date().getTime();var a=e.a;var v=e.v;a.qcv="vquant-1.0";a.duration=Math.floor(v.duration).toString();a.fr=v.videoWidth+"x"+v.videoHeight;a.volume=v.volume.toFixed(2).toString();a.time=Math.floor(v.currentTime).toString();_qevents.push(__qcvideo.clone(a));},setTracker:function(a){if(!a.videoElementId){return;}
var v=document.getElementById(a.videoElementId);if(!v||this.videos[a.videoElementId]){return;}
v.addEventListener("play",this.play,true);v.addEventListener("pause",this.pause,true);v.addEventListener("loadedmetadata",this.loadedmetadata,true);v.addEventListener("seeked",this.seeked,true);v.addEventListener("seeking",this.seeking,true);v.addEventListener("timeupdate",this.timeupdate,true);v.addEventListener("ended",this.ended,true);this.videos[a.videoElementId]=this.videoElem(a,v);if(!v.paused){__qcvideo.play();}},videoElem:function(a,v){return{a:a,v:v,pw:1,np:1,ls:0};},clone:function(a){if(a==null||typeof(a)!='object')
return a;var aa=new Object();for(var key in a)
aa[key]=this.clone(a[key]);return aa;},loadedmetadata:function(){var e=__qcvideo.getElem(arguments);e.a.event="embedded";__qcvideo.sendEvent(e);},play:function(){var e=__qcvideo.getElem(arguments);e.a.event="played";var t=function(){__qcvideo.recentevent(e);};setTimeout(t,200);},pause:function(){var e=__qcvideo.getElem(arguments);e.a.event="paused";var t=function(){__qcvideo.recentevent(e);};setTimeout(t,200);},seeking:function(){var e=__qcvideo.getElem(arguments);e.ls=new Date().getTime();},seeked:function(){var e=__qcvideo.getElem(arguments);e.a.event="seeked";__qcvideo.resetProgress(e);__qcvideo.sendEvent(e);},timeupdate:function(){var e=__qcvideo.getElem(arguments);var t=e.v.currentTime;if(t<e.np){return;}
__qcvideo.determineNP(e,t);e.a.event="progress";__qcvideo.sendEvent(e);},ended:function(){var e=__qcvideo.getElem(arguments);e.a.event="finished";__qcvideo.resetProgress(e);__qcvideo.sendEvent(e);},recentevent:function(e){var t=new Date().getTime();if((t-e.ls)<500)return;__qcvideo.sendEvent(e);},determineNP:function(e,t){e.pw*=2;e.np=t+e.pw;},resetProgress:function(e){e.pw=1;},getElem:function(arg){return __qcvideo.videos[arg[0].currentTarget.id];},setTrackers:function(){if(typeof _qvideos=='undefined'){_qvideos=[];}
if(!__qcvideo.evts){for(var k in _qvideos){__qcvideo.setTracker(_qvideos[k]);}
_qvideos={push:function(){var a=arguments;for(var i=0;i<a.length;i++){__qcvideo.setTracker(a[i]);}}};__qcvideo.evts=1;}}};}
var _qevents=_qevents||[];__qcvideo.setTrackers();


}
/*
     FILE ARCHIVED ON 00:33:47 Apr 06, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:24:07 Jul 27, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.595
  exclusion.robots: 0.021
  exclusion.robots.policy: 0.009
  esindex: 0.014
  cdx.remote: 11.976
  LoadShardBlock: 42.163 (3)
  PetaboxLoader3.datanode: 45.428 (4)
  load_resource: 235.957
  PetaboxLoader3.resolve: 216.267
*/