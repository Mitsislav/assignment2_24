/* a */

let confirmPassF=document.getElementById("confirmPassword");

confirmPassF.addEventListener("input",function(){

    const confirmPassword=document.getElementById("confirmPassword").value;
    const password=document.getElementById("password").value
    const mismatch=document.getElementById("passwordNotMatch");

     if (password !== confirmPassword){
        mismatch.textContent = "Passwords not matching";
     }else{
        mismatch.textContent = "";
     }
});

const passwordF=document.getElementById("password");
const EyeBtn=document.getElementById("eye");

EyeBtn.addEventListener("click",function(){

   if (passwordF.type === "password"){
      passwordF.type ="text"; 
      EyeBtn.textContent ="🙈"; 
   }else{
      passwordF.type ="password";
      EyeBtn.textContent ="🙉";
  }
})

const password2F=document.getElementById("confirmPassword");
const EyeBtn2=document.getElementById("eye2");

EyeBtn2.addEventListener("click",function(){

   if(password2F.type==="password"){
         password2F.type="text";
         EyeBtn2.textContent="🙈";
   }else{
      password2F.type="password";
      EyeBtn2.textContent="🙉";
   }
})

/* b */

passwordF.addEventListener("input",function(){
   checkPasswordStrength();
})

/* c */

const userType=document.getElementById("type");
const volunteerFields=document.getElementById("volunteerF");
const termsMsg=document.getElementById("termsMsg");

userType.addEventListener("change", function(){
   if(userType.value=="volunteer"){
      volunteerFields.style.display="block";
      termsMsg.textContent="Δηλώνω υπεύθυνα ότι ανήκω στο ενεργό δυναμικό των εθελοντών πυροσβεστών.";
   }else{
      volunteerFields.style.display="none";
      termsMsg.textContent="Απαγορεύεται η άσκοπη χρήση της εφαρμογής. Συμφωνώ πως η άσκοπη χρήση της θα διώκεται ποινικά.";
   }
})


const mismatch=document.getElementById("passwordNotMatch");
const submitBtn=document.getElementById("submit");


/* function checkPasswordsMatch() */

function checkPasswordsMatch() {
   if (passwordF.value !== password2F.value) {
       mismatch.textContent = "Passwords does not matching";
       return false;
   }else
      return true;
}

/* function checkPasswordStrength() */

function checkPasswordStrength(){

   const password=document.getElementById("password").value;
   const passwordStrong=document.getElementById("passwordStrong");
   
   /* 1 */

   const forbiddenWords = /fire|fotia|ethelontis|volunteer/i;  /* i does not care about caps */
   if (forbiddenWords.test(password)) {   /* checks if inside the password there are forbidden words */
      passwordStrong.textContent="weak password , forbidden words detected";
      return false;
   }else{
      passwordStrong.textContent="";
   }

   /* 2 */

   const digits = password.replace(/[^0-9]/g, "").length;
   if (digits >= password.length / 2) {   /* checks if the half characters of password are digits */
      passwordStrong.textContent = "weak password , too many numbers";
      return false;
   }

   /* 3 */

   const charFreq= {}; /* array that stores the frequence of each character*/

   for (let char of password) {  /* for each character of password runs the loop */
      if (charFreq[char]) {   /* if character exists increase the freq by one*/
         charFreq[char]++;
      } else {
         charFreq[char]=1; /* if this char does not exist just put the freq at one */
      }
   }

   let maxFreq = 0; /* stores the highestest freq */

   for (let count of Object.values(charFreq)){
      if (count > maxFreq) {
         maxFreq= count;   /* dates the new best freq */
      }
   }

   if (maxFreq >= password.length / 2) {
      passwordStrong.textContent="weak password , repeated characters";
      return false;
   }

   /* 4 */

   let hasUpper = false;
   let hasLower = false;
   let hasNumber = false;
   let hasSymbol = false;

   for (let char of password) {
      if (/[A-Z]/.test(char)) {
         hasUpper = true;
      } else if (/[a-z]/.test(char)) {
         hasLower = true;
      } else if (/\d/.test(char)) {
         hasNumber = true;
      } else if (/[\W_]/.test(char)) {
         hasSymbol = true;
      }
   }

   if (hasUpper && hasLower && hasNumber && hasSymbol){
      passwordStrong.textContent="strong password";
      return true;
   }else{
      passwordStrong.textContent="medium password";
      return true;
   }   

}

/* function calculateAge(birthdate) */

function calculateAge(birthdate){
   const today = new Date();
   const bday = new Date(birthdate);
   let age = today.getFullYear() - bday.getFullYear();
   const m = today.getMonth() - bday.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
      age--;
   }
   return age;
}

/* function displayJsonForm() */

function displayJsonForm() {
   const formData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      birthdate: document.getElementById("birthdate").value,
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      gender: document.querySelector('input[name="gender"]:checked')?.value,
      afm: document.getElementById("afm").value,
      country: document.getElementById("country").value,
      prefecture: document.getElementById("prefecture").value,
      municipality: document.getElementById("municipality").value,
      address: document.getElementById("address").value,
      job: document.getElementById("job").value,
      telephone: document.getElementById("telephone").value,
      userType: userType.value,
      volunteer_type: document.getElementById("volunteer_type").value,
      height: document.getElementById("height").value,
      weight: document.getElementById("weight").value,
   };

   document.getElementById("Json").textContent = JSON.stringify(formData, null, 2);
}

/* submission button */

submitBtn.addEventListener("click",function(event){
   const doPasswordsMatch = checkPasswordsMatch();
   if(!doPasswordsMatch){
      event.preventDefault();
      alert("Please make sure that passwords matching");
      return;
   }

   if(!checkPasswordStrength()){
      event.preventDefault();
      alert("Your password is weak");
      return;
   }

   /* d */

   const birthdate = document.getElementById("birthdate").value;
   const age = calculateAge(birthdate);

   if (userType.value === "volunteer" && (age < 18 || age > 55)) {
      event.preventDefault();
      alert("Τhe age of the volunteer must be 18-55 years old");
      return;
  }

  /* e */

  //displayJsonForm();
  //event.preventDefault();

});
