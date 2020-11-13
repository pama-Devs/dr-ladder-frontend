
const localhost = 'http://localhost:5000';
const host = 'https://salty-journey-54652.herokuapp.com';

function ValidateFirst() {
    var password = document.getElementById("reg-password").value;
    var confirmPassword = document.getElementById("txtConfirmPassword").value;
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    } else {
        const userData = {
            email: document.getElementById("reg-email").value,
            password: document.getElementById("reg-password").value
        }
        fetch(`https://salty-journey-54652.herokuapp.com/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            localStorage.setItem('token', data.userDetails.token);
            localStorage.setItem('email', data.userDetails.email);
            window.location.href = "verify.html";
        })
    }
}

function ValidateSecond() {
    var password = document.getElementById("new-password").value;
    var confirmPassword = document.getElementById("txtConfirmPassword").value;
    const data = {
        password: password
    }
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    } else {
        fetch(`${host}/reset-password/${localStorage.getItem('reset-token')}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.passwordChanged) {
                window.location.href = "index_signup.html";
            }
        })
    }
}

function verifyOtp() {
    if(localStorage.getItem('forgot-password')) {
        const otp = document.getElementById("otp").value;
        const data = {
            otp: otp
        }
        fetch(`${host}/verify-otp`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
                alert(data.message);
                localStorage.setItem('newOTPverified', data.newOTPverified);
                localStorage.setItem('reset-token', data.token);
                if(data.newOTPverified) {
                    window.location.href = "resetpass.html";
                }
            })
    } else {
        const otp = document.getElementById("otp").value;
        const data = {
            otp: otp,
            email: localStorage.getItem('email')
        }
    fetch(`${host}/signup/${localStorage.getItem('token')}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
            alert(data.message);
            localStorage.setItem('verified', data.verified);
            if(data.verified) {
                window.location.href = "login.html";
            }
        })
    }
}

function verifyAdminOtp() {
        const otp = document.getElementById("otp").value;
        const data = {
            otp: otp
        }
        fetch(`${host}/admin-verify-new-otp`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
                alert(data.message);
                localStorage.setItem('AdminNewOTPverified', data.newOTPverified);
                localStorage.setItem('admin-reset-token', data.token);
                if(data.newOTPverified) {
                    window.location.href = "adminResetPass.html";
                }
            })
}

function loginUser() {
    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("pass").value
    }
    fetch(`${host}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(dataLogin => {
        if(dataLogin.verified) {
            localStorage.setItem('isLoggedIn', dataLogin.isLoggedIn);
            localStorage.setItem('loginToken', dataLogin.token);
            localStorage.setItem('email', dataLogin.email);
            localStorage.setItem('break-token', dataLogin.breakToken);
            fetch(`${host}/user-logger-track`, {
                    method: 'POST',
                    headers: {

                    }
                })
                .then(res => res.json())
                .then(data => {
                    alert(dataLogin.message);
                    window.location.href = "main.html";
                })
        } else{
            alert(dataLogin.message);
        }});
}

function Logout(){
    fetch(`${host}/logout/${localStorage.getItem('loginToken')}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(dataLogout => {
            
                fetch(`${host}/user-logger-track`, {
                    method: 'POST'
                })
                .then(res => res.json())
                .then(data => {
                    alert(dataLogout.message);
                    localStorage.clear();
                    window.location.href = "index_signup.html";
            })
                
    })
}


function sheetSubmit(e) {
    e.preventDefault();
    const formData = {
        date: document.getElementById('date').value,
        recruiter_name: document.getElementById('recruiter_name').value,
        college: document.getElementById('college').value,
        speciality: document.getElementById('speciality').value,
        post: document.getElementById('post').value,
        candidate_name: document.getElementById('candidate_name').value,
        qualification: document.getElementById('qualification').value,
        mobile_number: document.getElementById('mobile').value,
        experience: document.getElementById('experience').value,
        current_sal: document.getElementById('current_sal').value,
        current_location: document.getElementById('current_location').value,
        languages_known: document.getElementById('languages').value,
        expected_sal: document.getElementById('expected_salary').value,
        preferable_loc: document.getElementById('preferrable_location').value,
        family: document.getElementById('family').value,
        notice_period: document.getElementById('notice_period').value,
        doctorFeedback: document.getElementById('doctor-feedback').value,
        clientFeedback: document.getElementById('client-feedback').value
    }
    const form = new FormData();
    for(const [key, value] of Object.entries(formData)) {
        form.append(key, value);
    }
    localStorage.setItem('tab', formData.recruiter_name);
    fetch(`${host}/sheets-edit`, {
        method: "POST",
        headers: {
        },
        body: form
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  
    });
} 

function resendOTP() {
    const email = document.getElementById('retype-email').value;
    const data = {
        email: email
    }
    fetch(`${host}/resend-otp`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if(data.sent) {
            localStorage.setItem('forgot-password', true);
            localStorage.setItem('newOTP', data.otp);
            window.location.href = "verify.html";
        }
    })
}

const resendAdminOTP = () => {
    const email = document.getElementById('retype-admin-email').value;
    const data = {
        email: email
    }
    fetch(`${host}/admin-resend-otp`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if(data.sent) {
            localStorage.setItem('admin-forgot-password', true);
            localStorage.setItem('adminNewOTP', data.otp);
            window.location.href = "adminverify.html";
        }
    })
}

//Hireform join us form submission

const submitHandler = (e) => {
    e.preventDefault();

    //fetch the form data values
    const formData = {
        first_name: document.getElementById("name").value,
        last_name: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        contact_number: document.getElementById("phone").value,
        dob: document.getElementById("dob").value,
        interested_in: interestedIn(),
        qualification: document.getElementById("edu").value,
        company: document.getElementById("com").value,
        designation: document.getElementById("des").value,
        from: document.getElementById("fro").value,
        to: document.getElementById("to").value,
        last_month_sal: document.getElementById("sal1").value,
        expected_monthly_sal: document.getElementById("sal2").value,
        possible_month_of_joining: document.getElementById("jon").value,
        additional_info: document.getElementById("inf").value,
        resume: document.getElementById("exampleFormControlFile1").files[0],
        photo: document.getElementById("exampleFormControlFile2").files[0]
    } 

    //fetch the checked radio button
    function interestedIn() {
        var radios = document.getElementsByClassName("form-check-input");
        for(let radio of radios) {
            if(radio.checked) {
                return document.getElementById(radio.id).value;
            }
        }
    }

     //create an instance of form data object
      var myFormData = new FormData();

      //append the form data name and values
      for(const [key, value] of Object.entries(formData)) {
        myFormData.append(key, value);
    }
    
      //fetch api with post method---form submission
      fetch(`${host}/contact-us`, {
          method: "POST",
          headers: {
          },
          body: myFormData
      })
      .then(response => response.json())
      .then(data => {
        alert(`${data.message}`);
        location.reload();
      })
}

const hireFormSubmit = (e) => {
    e.preventDefault();
    const form = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    }
    var formData = new FormData();
    for(const [key, value] of Object.entries(form)) {
        formData.append(key, value);
    }
    fetch(`${host}/hire-form`, {
        method: 'POST',
        headers: {
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
    })
}

const joinUsFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
        first_name: document.getElementById('name').value,
        last_name: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        contact: document.getElementById('phone').value,
        preferrable_location: document.getElementById('loc').value,
        position: position(),
        resume: document.getElementById('exampleFormControlFile1').files[0]
    }

    //fetch the checked radio button
    function position() {
        var radios = document.getElementsByClassName("form-check-input");
        for(let radio of radios) {
            if(radio.checked) {
                return document.getElementById(radio.id).value;
            }
        }
    }

    //create FormData Object
    const form = new FormData();
    for(const [key, value] of Object.entries(formData)) {
        form.append(key, value);
    }

    //fetch api
    fetch(`${host}/join-us`, {
        method: 'POST',
        headers: {

        },
        body: form
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        console.log(data);
    })
}


// admin Login

const adminLogin = () => {
    const cred = {
        email: document.getElementById('admin-email').value,
        password: document.getElementById('admin-password').value
    }
    fetch(`${host}/admin-login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cred)
    })
    .then(res => res.json())
    .then(data => {
        if(data.isLoggedIn) {
            alert(data.message);
            localStorage.setItem('admin-token', data.token);
            localStorage.setItem('adminIsLoggedIn', data.isLoggedIn);
            window.location.href = "management.html";
        } else {
            alert(data.message);
        }
    })
}

//admin Logout

const adminLogout = () => {
    fetch(`${host}/admin-logout/${localStorage.getItem('admin-token')}`, {
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        if(!data.isLoggedIn) {
            alert(data.message);
            localStorage.removeItem('admin-token');
            localStorage.removeItem('adminIsLoggedIn');
            localStorage.clear();
            window.location.href = "index_signup.html";
        } else {
            alert(data.message);
        }
    })
}

//admin reset pass
function adminResetPass() {
    var password = document.getElementById("new-password").value;
    var confirmPassword = document.getElementById("txtConfirmPassword").value;
    const data = {
        password: password
    }
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    } else {
        fetch(`${host}/admin-reset-password/${localStorage.getItem('admin-reset-token')}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.passwordChanged) {
                window.location.href = "index_signup.html";
            }
        })
    }
}

let timerId = '';
let timer = 0;



//track user 
const userStatusTrack = () => {
    var status = document.getElementById('status');
if(status.value == 'BREAK') {
    alert("status changed to break");
        timerId = setInterval(function() {
            timer++;
        }, 1000);
}

if(status.value == 'ACTIVE') {
        clearInterval(timerId);
        const dataIn = {
            timer: timer
        }
        fetch(`${host}/track-break-time/${localStorage.getItem('break-token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataIn)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            timer = 0;
        })

    }
}

