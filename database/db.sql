USE sabiduria;


CREATE TABLE Periods (
	cod_pa INT PRIMARY KEY,
    desciption VARCHAR(50)
);

CREATE TABLE Departments (
	cod_Depart VARCHAR(5) PRIMARY KEY NOT NULL,
    named VARCHAR(40) 
);

CREATE TABLE Subjects (
	cod_sub INT PRIMARY KEY,
    namesub VARCHAR(50),
    cod_depart VARCHAR(5) NOT NULL,
    FOREIGN KEY (cod_depart) REFERENCES Departments(cod_depart) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Courses(
	NRC INT PRIMARY KEY,
    cod_sub INT NOT NULL,
    cod_pa INT NOT NULL,
    FOREIGN KEY(cod_sub) REFERENCES Subjects(cod_sub) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(cod_pa) REFERENCES Periods(cod_pa) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Students(
	cod_stud INT PRIMARY KEY,
    nameE VARCHAR(20),
    lastname VARCHAR(40),
    passw VARCHAR(30) NOT NULL
);

CREATE TABLE Enrollments (
	num_enroll INT PRIMARY KEY,
    cod_stud INT NOT NULL,
    cod_pa INT NOT NULL,
    FOREIGN KEY(cod_stud) REFERENCES Students(cod_stud) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(cod_pa) REFERENCES Periods(cod_pa) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Register (
	NRC INT NOT NULL,
    num_enroll INT NOT NULL,
	FOREIGN KEY (NRC) REFERENCES Courses(NRC) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(num_enroll) REFERENCES Enrollments(num_enroll) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(NRC,num_enroll)
);

CREATE TABLE Programs(
	cod_prog VARCHAR(40) PRIMARY KEY,
    cod_dep VARCHAR(5) NOT NULL,
    FOREIGN KEY(cod_dep) REFERENCES Departments(cod_depart) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Studyplans(
	cod_sp INT PRIMARY KEY,
    cod_program VARCHAR(40) NOT NULL,
    FOREIGN KEY(cod_program) REFERENCES Programs(cod_prog) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Hires(
	cod_stud INT ,
	cod_sp INT ,
	FOREIGN KEY (cod_stud) REFERENCES Students(cod_stud) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(cod_sp) REFERENCES Studyplans(cod_sp) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(cod_stud,cod_sp)
);

CREATE TABLE Classrooms(
	cod_class VARCHAR(10) PRIMARY KEY,
    timec TIMESTAMP
);

CREATE TABLE Lodge(
	NRC INT NOT NULL,
    cod_class VARCHAR(10) NOT NULL,
	FOREIGN KEY (NRC) REFERENCES Courses(NRC) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(cod_class) REFERENCES Classrooms(cod_class) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(NRC,cod_class)
);

CREATE TABLE Profesors(
	cod_prof INT PRIMARY KEY,
    namep VARCHAR(20),
    lastname VARCHAR(20),
    cod_dep VARCHAR(5) NOT NULL,
    passw VARCHAR(30) NOT NULL,
    FOREIGN KEY(cod_dep) REFERENCES Departments(cod_depart) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Instructs(
	NRC INT NOT NULL,
    cod_prof INT,
	FOREIGN KEY (NRC) REFERENCES Courses(NRC) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(cod_prof) REFERENCES Profesors(cod_prof) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(NRC,cod_prof)
);



CREATE TABLE Compose(
	cod_sp INT NOT NULL,
    cod_sub INT ,
    semester INT,
	FOREIGN KEY (cod_sp) REFERENCES Studyplans(cod_sp) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(cod_sub) REFERENCES Subjects(cod_sub) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(cod_sp,cod_sub)
);


CREATE TABLE Schedules (
	dates VARCHAR(20) NOT NULL,
    st_time TIME NOT NULL,
    fin_time TIME NOT NULL,
    NRC INT,
    FOREIGN KEY (NRC) REFERENCES Courses(NRC) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (dates,st_time,fin_time,NRC)
);

CREATE TABLE Meetings (
	cod int PRIMARY KEY AUTO_INCREMENT,
	prof_number INT,
    stud_number INT,
    today DATE,
	cod_class VARCHAR(10) ,
    cod_prof INT,
    dates VARCHAR(20),
    st_time TIME ,
    fin_time TIME ,
    NRC INT,
    FOREIGN KEY (cod_class) REFERENCES Classrooms(cod_class) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (dates, st_time, fin_time, NRC) REFERENCES Schedules(dates, st_time, fin_time, NRC) ON UPDATE CASCADE ON DELETE CASCADE,  
    FOREIGN KEY (cod_prof) REFERENCES Profesors(cod_prof) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (NRC) REFERENCES Courses(NRC) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Attends (
	cod int,
    cod_stud INT,
    state VARCHAR(1),
    FOREIGN KEY (cod) REFERENCES Meetings(cod) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (cod_stud) REFERENCES Students(cod_stud) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (cod,cod_stud)
);


/* Periods */
INSERT INTO Periods VALUES (202110, 'First semester of 2021');
INSERT INTO Periods VALUES (202130, 'Second semester of 2021');
INSERT INTO Periods VALUES (202010, 'First semester of 2020');
INSERT INTO Periods VALUES (202030, 'Second semester of 2020');
INSERT INTO Periods VALUES (201910, 'First semester of 2019');
INSERT INTO Periods VALUES (201930, 'Second semester of 2019');

/* Departments */
INSERT INTO Departments VALUES ("IST", 'Systems engineer');
INSERT INTO Departments VALUES ("ARQ", 'Architecture');
INSERT INTO Departments VALUES ("MED", 'Medicine');
INSERT INTO Departments VALUES ("DIN", 'Design');
INSERT INTO Departments VALUES ("ICI", 'Civil engineer');
INSERT INTO Departments VALUES ("LEY", 'Law');

/*Subjects*/
INSERT INTO Subjects VALUES (12, 'Digital design',"IST");
INSERT INTO Subjects VALUES (78, 'Descriptive geometry',"ARQ");
INSERT INTO Subjects VALUES (83, 'Cellular biology',"MED");
INSERT INTO Subjects VALUES (56, 'Design history',"DIN");
INSERT INTO Subjects VALUES (32, 'Hidrology',"ICI");
INSERT INTO Subjects VALUES (73, 'Penal I',"LEY");


 /* Courses */
 INSERT INTO Courses VALUES (2679, 12,202130);
 INSERT INTO Courses VALUES (2736, 78,202130);
 INSERT INTO Courses VALUES (9810, 83,202130); 
 INSERT INTO Courses VALUES (2749, 56,202130);
 INSERT INTO Courses VALUES (3785, 32,202130);
 INSERT INTO Courses VALUES (5872, 73,202130);
 
  /* Students */
 INSERT INTO Students VALUES (200167298, "Carlos","Zapata","A75jl");
 INSERT INTO Students VALUES (200074294, "Natalia","Hernandez","NH520r");
 INSERT INTO Students VALUES (200158253, "Sofia","Rosales","S65Rjk"); 
 INSERT INTO Students VALUES (200165295, "Andres","Cardenas","C5926");
 INSERT INTO Students VALUES (200649264, "Carla","Rodriguez","HT9833");
 INSERT INTO Students VALUES (200165283, "Daniela","Salazar","DS762394");
 
 /*Enrollments*/
 INSERT INTO Enrollments VALUES (3476,200167298,202130);
 INSERT INTO Enrollments VALUES (2986,200074294,202130);
 INSERT INTO Enrollments VALUES (9845,200158253,202130); 
 INSERT INTO Enrollments VALUES (0912,200165295,202130);
 INSERT INTO Enrollments VALUES (5699,200649264,202130);
 INSERT INTO Enrollments VALUES (3678,200165283,202130);
 
 /*Register*/
 INSERT INTO Register VALUES (2679, 3476);
 INSERT INTO Register VALUES (2736, 3476);
 INSERT INTO Register VALUES (9810, 3476);
 INSERT INTO Register VALUES (2736, 2986);
 INSERT INTO Register VALUES (9810, 9845); 
 INSERT INTO Register VALUES (2749, 0912);
 INSERT INTO Register VALUES (3785, 5699);
 INSERT INTO Register VALUES (5872, 3678);
 
 /*Programs*/
INSERT INTO Programs VALUES ("Bachelor systems engineer","IST");
INSERT INTO Programs VALUES ("Bachelor architecture","ARQ");
INSERT INTO Programs VALUES ("Bachelor medicine","MED");
INSERT INTO Programs VALUES ("Bachelor graphic design","DIN");
INSERT INTO Programs VALUES ("Bachelor civil engineer","ICI");
INSERT INTO Programs VALUES ("Bachelor law","LEY");

/*Studyplans*/
INSERT INTO Studyplans VALUES (647382,"Bachelor systems engineer");
INSERT INTO Studyplans VALUES (254916,"Bachelor architecture");
INSERT INTO Studyplans VALUES (274563,"Bachelor medicine");
INSERT INTO Studyplans VALUES (394752,"Bachelor graphic design");
INSERT INTO Studyplans VALUES (974633,"Bachelor civil engineer");
INSERT INTO Studyplans VALUES (1836592,"Bachelor law");

 /*hires*/
INSERT INTO Hires VALUES (200167298,647382);
INSERT INTO Hires VALUES (200074294,254916);
INSERT INTO Hires VALUES (200158253,274563);
INSERT INTO Hires VALUES (200165295,394752);
INSERT INTO Hires VALUES (200649264,974633);
INSERT INTO Hires VALUES (200165283,1836592);
 
 /*Classrooms*/
INSERT INTO Classrooms VALUES ("28D",'2021/12/07 16:30:00');
INSERT INTO Classrooms VALUES ("35E",'2021/12/09 06:30:00');
INSERT INTO Classrooms VALUES ("26F",'2021/12/14 10:30:00');
INSERT INTO Classrooms VALUES ("45K",'2021/12/08 16:30:00');
INSERT INTO Classrooms VALUES ("63K",'2021/12/10 12:30:00');
INSERT INTO Classrooms VALUES ("43J",'2021/12/06 15:30:00');

/*lodge*/
INSERT INTO lodge VALUES (2679,"28D");
INSERT INTO lodge VALUES (2736,"35E");
INSERT INTO lodge VALUES (9810,"26F");
INSERT INTO lodge VALUES (2749,"45K");
INSERT INTO lodge VALUES (3785,"63K");
INSERT INTO lodge VALUES (5872,"43J");

/*Profesors*/
 INSERT INTO Profesors VALUES (653892736, "Camilo","Rojas","IST","C643R");
 INSERT INTO Profesors VALUES (689126382, "Luis","Ramirez","ARQ","R73846L");
 INSERT INTO Profesors VALUES (624398163, "Sara","Garcia","MED","S6384G"); 
 INSERT INTO Profesors VALUES (683923516, "Daniel","Serrano","DIN","D78346S");
 INSERT INTO Profesors VALUES (629374553, "Horacio","Arango","ICI","H639A84");
 INSERT INTO Profesors VALUES (619384659, "Ana","Martinez","LEY","AM58237");
 
 /*Instructs*/
INSERT INTO Instructs VALUES (2679,653892736);
INSERT INTO Instructs VALUES (2736,689126382);
INSERT INTO Instructs VALUES (9810,624398163);
INSERT INTO Instructs VALUES (2749,683923516);
INSERT INTO Instructs VALUES (3785,629374553);
INSERT INTO Instructs VALUES (5872,619384659);


/*Compose*/
INSERT INTO Compose VALUES (647382,12,5);
INSERT INTO Compose VALUES (254916,78,2);
INSERT INTO Compose VALUES (274563,83,3);
INSERT INTO Compose VALUES (394752,56,6);
INSERT INTO Compose VALUES (974633,32,2);
INSERT INTO Compose VALUES (1836592,73,4);

/*Schedules*/
INSERT INTO Schedules VALUES ("Tuesday",'16:30:00','18:30:00',2679);
INSERT INTO Schedules VALUES ("Thursday",'06:30:00','08:30:00',2736);
INSERT INTO Schedules VALUES ("Tuesday",'10:30:00','12:30:00',9810);
INSERT INTO Schedules VALUES ("Wednesday",'16:30:00','18:30:00',2749);
INSERT INTO Schedules VALUES ("Friday",'12:30:00','14:30:00',3785);
INSERT INTO Schedules VALUES ("Monday",'15:30:00','17:30:00',5872);

/*Meetings*/
INSERT INTO Meetings (prof_number,stud_number,today,cod_class,cod_prof,dates,st_time,fin_time,NRC) VALUES (26372937,64839254,"2021-11-16","28D",653892736,"Tuesday",'16:30:00','18:30:00',2679);
INSERT INTO Meetings (prof_number,stud_number,today,cod_class,cod_prof,dates,st_time,fin_time,NRC) VALUES (78346582,63429154,"2021-11-18","35E",689126382,"Thursday",'06:30:00','08:30:00',2736);
INSERT INTO Meetings (prof_number,stud_number,today,cod_class,cod_prof,dates,st_time,fin_time,NRC) VALUES (63859365,26485629,"2021-11-09","26F",624398163,"Tuesday",'10:30:00','12:30:00',9810);
INSERT INTO Meetings (prof_number,stud_number,today,cod_class,cod_prof,dates,st_time,fin_time,NRC) VALUES (64827465,26384628,"2021-11-17","45K",683923516,"Wednesday",'16:30:00','18:30:00',2749);
INSERT INTO Meetings (prof_number,stud_number,today,cod_class,cod_prof,dates,st_time,fin_time,NRC) VALUES (364856284,6273915,"2021-11-19","63K",629374553,"Friday",'12:30:00','14:30:00',3785);
INSERT INTO Meetings (prof_number,stud_number,today,cod_class,cod_prof,dates,st_time,fin_time,NRC) VALUES (344758273,6385628,"2021-11-22","43J",619384659,"Monday",'15:30:00','17:30:00',5872);

/*Attends*/
INSERT INTO Attends VALUES (1,200167298," ");
INSERT INTO Attends VALUES (2,200074294,"+");
INSERT INTO Attends VALUES (3,200158253,"-");
INSERT INTO Attends VALUES (4,200165295," ");
INSERT INTO Attends VALUES (5,200649264,"-");
INSERT INTO Attends VALUES (6,200165283,"+");