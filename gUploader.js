(function($) {
    $.gUploader = {        
        exec: function(id, idForm, url, typeFile, requestHeader) {                        
            var srcFormData = $("#" + idForm).get(0);
            var formData = new FormData(srcFormData);

            $.ajax({
                url: url,
                type: 'POST',
                data: formData,
                success: function (data) {  
                    $("#"+id).attr('disabled', false);
                    msg = data.msg;
                    var res = $.parseJSON(data);  

                    if(typeFile != undefined && typeFile == 'image' && res.status){
                        $(".preview-image-"+id).html("<a href='#' class='preview-image'><img src='" + res.imagem_dir + "' width='100'></a>");
                        //$("#imagem_dir_"+id).attr('src', res.imagem_dir);    
                    }
                    // $("#"+id+"_ref").val(data.imagem_dir);
                    
                    // $("#hash_"+id).val(data.hash);
                    $("#upload_"+id).html(res.msg);
                    $("#" + id).val('');
                },
                cache: false,
                contentType: false,
                processData: false,
                xhr: function() {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { // Avalia se tem suporte a propriedade upload                       
                        myXhr.upload.addEventListener('progress', function () {                         
                            $("#"+id).attr('disabled', true);
                            
                            divProcessUpload = $("#upload_"+id).length;
                            if(divProcessUpload == 0 || divProcessUpload == undefined) {
                                $("#"+id).after("<div id='upload_"+id+"' style='font-size: 12px;'>Enviando...</div>");
                            }                           
                        }, false);
                    }
                return myXhr;
                },
                beforeSend: function(xhr) {                    
                    if (requestHeader !== undefined){
                        xhr.setRequestHeader('Authorization',
                        'Bearer ' + requestHeader);
                    }
                }           
            });
            $("#div_form_upload").remove();
            return false;                
        },        
    }
})(jQuery);