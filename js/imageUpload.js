defaultSrc='assets/imgs/picture.png';

function imageUpload(object,oldUrl,width,height,deleteOld,callbackImage) {
	$(object).prev().find("img").attr('src',"assets/imgs/loading.gif");
	
	var _URL = window.URL || window.webkitURL;
	var img=object.files[0];
    var FileName  = img.name;
	var fileExt = FileName.substr(FileName.lastIndexOf('.')+1);

 	imgSize = new Image();
	imgSize.src = _URL.createObjectURL(img);
    console.log(imgSize.src);
	var imgStr;
	imgSize.onerror = function() {
       	alert( "not a valid file: " + img.type);
		callbackImage.call(oldUrl);
    };
		
	imgSize.onload = function () {
		if(width!=null && width!="undefined" && height!=null && height!="undefined"){
			if(this.width==width && this.height==height){
				var reader = new FileReader();  
				reader.readAsBinaryString(img);				
				reader.onload = function(evt) {
					var fileString = evt.target.result;
					encodedData = window.btoa(fileString);						
					doRequestNoHeader(baseRoot+"SavePicture","{\"client_id\":\"" + client_id+ "\",\"domain_id\":\"" + domain_id + "\",\"picture\":\""+encodedData+"\",\"extension\":\""+fileExt+"\"}", function () {
						url=this;
						callbackImage.call(url.picture_url);
						if($(object).next('div').hasClass('alert')){
							$(object).next('div').remove();
						}
						if(oldUrl!=defaultSrc && deleteOld==true){
						doRequestNoHeader(baseRoot+"DeletePicture", "{\"client_id\":\"" + client_id + "\",\"domain_id\":\"" + domain_id + "\",\"pictureURL\":\""+oldUrl+"\"}", function () {
							});
						}
					});
				}
			}else{
				$(object).after(showWarning(object,"The image must be "+width+"px  x "+height+"px"));
				callbackImage.call(oldUrl);	
			}
		}else{
			var reader = new FileReader();  
			reader.readAsBinaryString(img);
			reader.onload = function(evt) {
				var fileString = evt.target.result;
				var encodedData = window.btoa(fileString);		
					doRequestNoHeader(baseRoot+"SavePicture","{\"client_id\":\"" + client_id + "\",\"domain_id\":\"" + domain_id + "\",\"picture\":\""+encodedData+"\",\"extension\":\""+fileExt+"\"}", function () {
					url=this;
					callbackImage.call(url.picture_url);
					if($(object).next('div').hasClass('alert')){
						$(object).next('div').remove();
					}
					if(oldUrl!=defaultSrc && deleteOld==true){
						doRequestNoHeader(baseRoot+"DeletePicture", "{\"client_id\":\"" + client_id + "\",\"domain_id\":\"" + domain_id + "\",\"pictureURL\":\""+oldUrl+"\"}", function () {
						});
					}
				});
			}
		}
	}
}

