
try {
function funAPI(){
    this.name="";
    this.code="#";
    this.altCode='';
    this.url="";
    this.reqType='GET';
    this.callBack='';
    this.getOutput=function(){ return "";};
};
function ajaxResponse(url,type){
    var responseObj={Success:false,Data:""};
   try{
     if(typeof type=='undefined' || type==='' || type.toLowerCase()!='post')
        type='GET';
    var req=new XMLHttpRequest();
    req.open(type,url,false);
    req.send();
    if (req.readyState == 4 && req.status == 200) {
          responseObj.Data=JSON.parse(req.responseText);
          responseObj.Success=true;
    }
    else if (req.readyState == 4 && req.status == 404)
    {
        responseObj.Data="Page requested not found";
        responseObj.Success=false; 
    }
   }
   catch(e){
     console.log(e.message);
   }
   //console.log(responseObj) ;
   return responseObj;
};
var funAPIs=[];
function addFunAPI(aFunAPI){
    var anAPI=new funAPI();
    anAPI=aFunAPI;//"IMDB Gist";
    anAPI.getOutput=function(keyWord){
        var response='Sorry, Try again Later';
        if(this.url.indexOf('{keyWord}')!=-1)
			var fullURL=this.url+keyWord; 
		else
			var fullURL=this.url.replace('{keyWord}',keyWord);
        //console.log(fullURL);
        //flashLong(keyWord);
        //flashLong(fullURL);
        var result= ajaxResponse(fullURL,this.reqType);
        //console.log(result.Data[this.responseKey]);
        //flashLong(result.Data[this.responseKey]);
       //console.log(result);
       response=this.callBack(result);
       //if(result.Success===true && typeof result.Data[this.responseKey] !='undefined') 
         //   response=result.Data[this.responseKey];
       //console.log(response);
       return response;  
    };
    funAPIs.push(anAPI);
};
function splitTaskerAPIs(apis,splitter){
    if(typeof splitter=='undefined' || splitter==='')
        splitter='|^|';
    if(apis.length>0){
        for(var i=0;i<apis.length;i++){
            var apiProps=apis[i].split(splitter);
            try{
                var aFunAPI=new funAPI();
                aFunAPI.name=typeof apiProps[0]!='undefined'?apiProps[0].trim():'';
                aFunAPI.code=typeof apiProps[1]!='undefined'?apiProps[1].trim():'';
                aFunAPI.altCode=typeof apiProps[2]!='undefined'?apiProps[2].trim():'';
                aFunAPI.url=typeof apiProps[3]!='undefined'?apiProps[3].trim():"";
                if(typeof apiProps[4]!='undefined')
                    eval("aFunAPI.callBack="+apiProps[4].trim());
                else
                    aFunAPI.callBack=function(data){return data;};
                aFunAPI.reqType=typeof apiProps[5]!='undefined'?apiProps[5].trim():'GET';
                
                addFunAPI(aFunAPI);
            }
            catch(e){
               console.log(e.message);
            }
        }
    }
}
;

function getKeyWord(Msg,Code){
   if(Msg.indexOf(Code)!=-1)
   {       
       var splitArray=Msg.split(Code);
       if(splitArray.length>1)
       {
           var response='';
           if((splitArray[1].trim()).indexOf(' ')){
               var spaceSplitted=(splitArray[1].trim()).split(' ');
               response=spaceSplitted[0];
           }
           else
               response=splitArray[1].trim();
           if(response.indexOf('_')){
             response=response.replace('_','+');
           }
           return response;
       }
       else
           return false;
   }
   else
       return false;
   
}
;
function checkCode(Msg){
    var returnObj={index:-1,keyWord:''};
    //flash(funAPIs.length);
    //flash(Msg);
    //flash(Msg.indexOf(funAPIs[0].code));
    for(var i=0;i<funAPIs.length;i++){
        //flash(i); 
        if(funAPIs[i].code!='' && Msg.indexOf(funAPIs[i].code)!=-1)
         {
             returnObj.index=i;
             //flash(funAPIs[i].code);
             //flash(Msg);
             returnObj.keyWord=getKeyWord(Msg,funAPIs[i].code);
             break;
         }
         else if( funAPIs[i].altCode!='' &&  Msg.indexOf(funAPIs[i].altCode)!=-1)
         {
             returnObj.index=i;
             returnObj.keyWord=getKeyWord(Msg,funAPIs[i].altCode);
             break;
         }
    }
    return returnObj;
}
;

function getMagicAnswer(Msg){
   //flash(Msg); 
   var responseObj=checkCode(Msg);
    var result='';
    //flash(responseObj.keyWord);
    if(typeof responseObj.index !='undefined' && responseObj.index>-1 && responseObj.keyWord !==false)
    {
        result= funAPIs[responseObj.index].getOutput(responseObj.keyWord);
    }
    else
        result='Incorrect # key';
   //console.log(result); 
   return result;
};
var apisArray=global('%FunAPIs');
splitTaskerAPIs(apisArray.split("\n"),'|^|');
//flash(funAPIs[0].code);
//flash(curr_message);
wa_response=getMagicAnswer(msg);
//flash(wa_response);    
} 
catch (err)
{ 
    flashLong(err.message); 
    setGlobal ('%IsProcessing',0);
}
