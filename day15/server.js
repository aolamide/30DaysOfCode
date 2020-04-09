const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());

//variable would hold courses from post request
let courses = [];

//function to get gradePoint (A : 5, B : 4, C : 3, D: 2, E: 1, F : 0)
const getGradePoint = score => {
    if(score < 40) return 0
    else if(score < 45) return 1
    else if(score < 50) return 2
    else if(score < 60) return 3
    else if(score < 70) return 4
    return 5;
}

const getSGPA = data => {

    //use the reduce function to calculate total units and total grade points

    let totalUnits = data.reduce((accumulator, course) => accumulator + course.units , 0);

    let totalGradePoints = data.reduce((accumulator, course) => accumulator + (course.units * getGradePoint(course.score)), 0)

    let sgpa = totalGradePoints / totalUnits;

    return sgpa;
}


app.post('/sendData', (req, res) => {
    const { courses : data } = req.body;

    //assign data from request to our global courses variable
    courses = data;

    return res.json({
        message : 'Data saved successfully'
    })
});

app.get('/sgpa', (req, res) => {
    let SGPA = getSGPA(courses);
    return res.json({
        sgpa : SGPA
    })
});

app.listen(3002, () => console.log('server on'));