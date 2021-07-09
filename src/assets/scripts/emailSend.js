 let makeRequest = (method, url, data) => {
   return new Promise(function (resolve, reject) {
     let xhr = new XMLHttpRequest();
     xhr.open(method, url);
     xhr.onload = function () {
       if (this.status >= 200 && this.status < 300) {
         resolve(xhr.response);
       } else {
         reject({
           status: this.status,
           statusText: xhr.statusText
         });
       }
     };
     xhr.onerror = function () {
       reject({
         status: this.status,
         statusText: xhr.statusText
       });
     };
     if (method == "POST" && data) {
       document.body.style.overflow = "hidden";
       if(window.location.pathname == '/pl/')
      {
        UIkit.notification({
          message: 'Trwa wysyłanie...',
          pos: 'bottom-right',
          status: 'primary'
        }, )
        xhr.send(data);
        return 0;
      }
     if (window.location.pathname == '/uk/')
      {
        UIkit.notification({
          message: 'Sending...',
          pos: 'bottom-right',
          status: 'primary'
        }, )
        xhr.send(data);
        return 0;
      }

       UIkit.notification({
         message: 'Het verzenden is bezig...',
         pos: 'bottom-right',
         status: 'primary'
       }, )
       xhr.send(data);
       return 0;
     } else {
       xhr.send();
       return 0;
     }
   });
 }

const contactFrom = () => {
  document.querySelector("#contact-form").addEventListener("submit", (e) => {
    const path = (window.location.pathname != '/') ? "./../assets/php/send-email.php" : "./assets/php/send-email.php";
    e.preventDefault()
    let formData = new FormData();
    

    formData.append("lang", (window.location.pathname != '/')? window.location.pathname : 'nl');
    formData.append("name", document.querySelector("#form-name").value);
    formData.append("subject", document.querySelector("#form-subject").value);
    formData.append("email", document.querySelector("#form-email").value);
    formData.append("phone", document.querySelector("#form-phone").value);
    formData.append("message", document.querySelector("#form-message").value);


      makeRequest('POST', path, formData).then(response => {
        const data = response;
        UIkit.notification.closeAll()
        document.body.style.overflow = "auto";
        if (response == "Complete") {
          document.querySelector("#contact-form").reset();
          if(window.location.pathname =='/pl/')
          {
            UIkit.notification({
              message: 'Wysłano!',
              pos: 'bottom-right',
              status: 'success'
            })
            return 0;
          }
          if(window.location.pathname =='/uk/')
          {
            UIkit.notification({
              message: 'Successfully sent!',
              pos: 'bottom-right',
              status: 'success'
            })
            return 0;
          }

          UIkit.notification({
            message: 'Verzonden!',
            pos: 'bottom-right',
            status: 'success'
          })
          return 0;

        } else {

          if(window.location.pathname =='/pl/')
          {
            UIkit.notification({
              message: 'Wystąpił błąd...',
              pos: 'bottom-right',
              status: 'danger'
            }, )
            return 0;
          }
          if(window.location.pathname =='/uk/')
          {
            UIkit.notification({
              message: 'Error occured...',
              pos: 'bottom-right',
              status: 'danger'
            }, )
            return 0;
          }
          UIkit.notification({
            message: 'Fout opgetreden...',
            pos: 'bottom-right',
            status: 'danger'
          }, )
          return 0;
        }


      })
    })
}
contactFrom();
