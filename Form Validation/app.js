const form = document.getElementById('signupForm');
const fullName      = document.getElementById('fullName');
const dob           = document.getElementById('dob');
const age           = document.getElementById('age');
const cnic          = document.getElementById('cnic');
const nationality   = document.getElementById('nationality');
const country       = document.getElementById('country');
const province      = document.getElementById('province');
const district      = document.getElementById('district');
const city          = document.getElementById('city');
const email         = document.getElementById('email');
const phone         = document.getElementById('phone');
const password          = document.getElementById('password');
const confirmPassword   = document.getElementById('confirmPassword');
const formMessage   = document.getElementById('formMessage');
function showError(inputElement, message) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = message;
    errorElement.classList.add('visible');
    inputElement.classList.add('error-border');
    inputElement.classList.remove('valid');
}
function showValid(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
    inputElement.classList.remove('error-border');
    inputElement.classList.add('valid');
}
function clearFieldState(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
    inputElement.classList.remove('error-border');
    inputElement.classList.remove('valid');
}
dob.addEventListener('change', function() {
    const dobValue = this.value;   
    if (dobValue === '') {
        age.value = '';          
        return;
    }
    const birthDate = new Date(dobValue);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();

    // Check if birthday has already happened this year
    // If not, subtract 1 from the age
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
}
    // Show the age (only if it's a reasonable number)
    if (calculatedAge >= 0 && calculatedAge <= 150) {
        age.value = calculatedAge;
    } else {
        age.value = 'Invalid date';
    }
});
// Each returns '' (empty) if valid, or an error message if invalid.

function validateName() {
    const value = fullName.value.trim();
    if (value === '')                    return 'Full name is required.';
    if (value.length < 2)                return 'Name must be at least 2 characters.';
    if (!/^[a-zA-Z\s]+$/.test(value))    return 'Name can only contain letters and spaces.';
    return '';
}

function validateDob() {
    const value = dob.value;
    if (value === '')                    return 'Date of birth is required.';

    const birthDate = new Date(value);
    const today = new Date();
    // Check if the date is in the future
    if (birthDate > today)               return 'Date of birth cannot be in the future!';
    // Check if user is at least 1 year old (no newborns for a registration form)
    const minAge = new Date();
    minAge.setFullYear(minAge.getFullYear() - 150);
    if (birthDate < minAge)              return 'That date seems too far in the past.';
    return '';
}

function validateCnic() {
    let value = cnic.value.trim();

    if (value === '')                     return 'CNIC number is required.';

    // Remove any dashes the user might have typed (e.g. "42201-1234567-8" → "4220112345678")
    // This way we only check the digits
    const digitsOnly = value.replace(/-/g, '');

    // CNIC must be exactly 13 digits
    if (!/^\d{13}$/.test(digitsOnly))     return 'CNIC must be exactly 13 digits (e.g. 42201-1234567-8).';

    return '';
}

function validateNationality() {
    const value = nationality.value.trim();
    if (value === '')                     return 'Nationality is required.';
    if (!/^[a-zA-Z\s]+$/.test(value))    return 'Nationality can only contain letters and spaces.';
    return '';
}

function validateCountry() {
    const value = country.value;
    if (value === '' || value === null)   return 'Please select your country.';
    return '';
}

function validateProvince() {
    const value = province.value.trim();
    if (value === '')                     return 'Province / State is required.';
    if (!/^[a-zA-Z\s]+$/.test(value))    return 'Province can only contain letters and spaces.';
    return '';
}

function validateDistrict() {
    const value = district.value.trim();
    if (value === '')                     return 'District is required.';
    if (!/^[a-zA-Z\s]+$/.test(value))    return 'District can only contain letters and spaces.';
    return '';
}

function validateCity() {
    const value = city.value.trim();
    if (value === '')                     return 'City is required.';
    if (!/^[a-zA-Z\s]+$/.test(value))    return 'City can only contain letters and spaces.';
    return '';
}

function validateEmail() {
    const value = email.value.trim();
    if (value === '')                     return 'Email address is required.';
    if (!value.includes('@'))             return 'Email must contain an "@" symbol.';
    const parts = value.split('@');
    if (parts[0].length === 0)            return 'Email needs text before the "@".';
    if (!parts[1].includes('.'))          return 'Email domain needs a dot (e.g. .com, .org).';
    return '';
}

function validatePhone() {
    const value = phone.value.trim();
    if (value === '')                     return 'Phone number is required.';
    if (!/^\d+$/.test(value))            return 'Phone can only contain digits (0-9).';
    if (value.length < 10 || value.length > 15) return 'Phone must be 10-15 digits long.';
    return '';
}

function validatePassword() {
    const value = password.value;
    if (value === '')                     return 'Password is required.';
    if (value.length < 6)                return 'Password must be at least 6 characters.';
    if (!/\d/.test(value))               return 'Password must contain at least one number.';
    if (!/[A-Z]/.test(value))            return 'Password must contain at least one uppercase letter.';
    return '';
}

function validateConfirm() {
    const passValue = password.value;
    const confirmValue = confirmPassword.value;
    if (confirmValue === '')             return 'Please confirm your password.';
    if (passValue !== confirmValue)      return 'Passwords do not match.';
    return '';
}

function validateAllFields() {

    const results = {
        name:        validateName(),
        dob:         validateDob(),
        cnic:        validateCnic(),
        nationality: validateNationality(),
        country:     validateCountry(),
        province:    validateProvince(),
        district:    validateDistrict(),
        city:        validateCity(),
        email:       validateEmail(),
        phone:       validatePhone(),
        pass:        validatePassword(),
        confirm:     validateConfirm()
    };

    // Apply visual feedback to each field
    if (results.name === '')        showValid(fullName);        else showError(fullName, results.name);
    if (results.dob === '')         showValid(dob);             else showError(dob, results.dob);
    // Age is auto-calculated, no validation needed
    if (results.cnic === '')        showValid(cnic);            else showError(cnic, results.cnic);
    if (results.nationality === '') showValid(nationality);     else showError(nationality, results.nationality);
    if (results.country === '')     showValid(country);         else showError(country, results.country);
    if (results.province === '')    showValid(province);        else showError(province, results.province);
    if (results.district === '')    showValid(district);        else showError(district, results.district);
    if (results.city === '')        showValid(city);            else showError(city, results.city);
    if (results.email === '')       showValid(email);           else showError(email, results.email);
    if (results.phone === '')       showValid(phone);           else showError(phone, results.phone);
    if (results.pass === '')        showValid(password);        else showError(password, results.pass);
    if (results.confirm === '')     showValid(confirmPassword); else showError(confirmPassword, results.confirm);

    // Return true ONLY if ALL fields passed
    return (
        results.name === '' && results.dob === '' &&
        results.cnic === '' && results.nationality === '' &&
        results.country === '' && results.province === '' &&
        results.district === '' && results.city === '' &&
        results.email === '' && results.phone === '' &&
        results.pass === '' && results.confirm === ''
    );
}

fullName.addEventListener('blur',      function() { const m = validateName();        m === '' ? showValid(fullName)        : showError(fullName, m); });
dob.addEventListener('blur',           function() { const m = validateDob();         m === '' ? showValid(dob)             : showError(dob, m); });
cnic.addEventListener('blur',          function() { const m = validateCnic();        m === '' ? showValid(cnic)            : showError(cnic, m); });
nationality.addEventListener('blur',   function() { const m = validateNationality(); m === '' ? showValid(nationality)     : showError(nationality, m); });
country.addEventListener('blur',       function() { const m = validateCountry();     m === '' ? showValid(country)         : showError(country, m); });
province.addEventListener('blur',      function() { const m = validateProvince();    m === '' ? showValid(province)        : showError(province, m); });
district.addEventListener('blur',      function() { const m = validateDistrict();    m === '' ? showValid(district)        : showError(district, m); });
city.addEventListener('blur',          function() { const m = validateCity();        m === '' ? showValid(city)            : showError(city, m); });
email.addEventListener('blur',         function() { const m = validateEmail();       m === '' ? showValid(email)           : showError(email, m); });
phone.addEventListener('blur',         function() { const m = validatePhone();       m === '' ? showValid(phone)           : showError(phone, m); });
password.addEventListener('blur',      function() { const m = validatePassword();    m === '' ? showValid(password)        : showError(password, m); });
confirmPassword.addEventListener('blur', function() { const m = validateConfirm();   m === '' ? showValid(confirmPassword) : showError(confirmPassword, m); });
form.addEventListener('submit', function(event) {

    event.preventDefault();   // stop page from refreshing

    const isFormValid = validateAllFields();

    if (isFormValid) {
        const formData = {
            fullName:     fullName.value.trim(),
            dob:          dob.value,
            age:          age.value,
            cnic:         cnic.value.trim(),
            nationality:  nationality.value.trim(),
            country:      country.value,
            province:     province.value.trim(),
            district:     district.value.trim(),
            city:         city.value.trim(),
            email:        email.value.trim(),
            phone:        phone.value.trim()
            // We don't store passwords for security reasons
        };

        // Show the success message with a summary
        formMessage.innerHTML = `✅ Success! Account created for <strong> ${formData.fullName} </strong> from ${formData.city}, ${formData.country}.`;
        formMessage.className = 'success';

        // You can see the data in the browser console (press F12)
        console.log('✅ Form Data:', formData);

        // Reset the form for a fresh start
        form.reset();
        age.value = '';   // age is readonly, form.reset() won't clear it

        // Clear all green/red borders
        const allInputs = [
            fullName, dob, cnic, nationality, country,
            province, district, city, email, phone,
            password, confirmPassword
        ];
        for (let input of allInputs) {
            clearFieldState(input);
        }

    } else {
        // ❌ SOME FIELDS HAVE ERRORS
        formMessage.textContent = '❌ Please fix the errors highlighted in red above.';
        formMessage.className = 'error';

        // Scroll to the top of the form so user can see the errors
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
form.addEventListener('input', function() {
    formMessage.textContent = '';
    formMessage.className = '';
});
