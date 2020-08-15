
(function () {
    //encompassing function to run all code
    function initialise() {
        //GLOBAL VARIABLES

        var geoMarker;
        var zoomListener;
        var infoLoc;
        var i;
        var iconBase = 'Images/';
        var png = '.png';
        var buildingIconBase = "/buildings/";


        //ARRAYS


        //initialising an empty array for building markers to be placed into. This allows iteration over building marker objects
        //to do actions such as toggling visibility and deleting the marker based on legend ticks.
        var markers = [];

        //JSON with all the building information to populate markers on the map with correct information
        var buildings = [
            {
                "b_id": "bic",
                "b_campus": "huddersfield",
                "b_name": "3M Buckley Innovation Centre (BIC)",
                "b_lat": "53.641667600000",
                "b_lng": "-1.776942000000",
                "b_description": "The 3M Buckley Innovation Centre is a brand new \u00a313M building which promotes economic growth through work with businesses.  With access to markets, finance, technology and skills alongside a wealth of business support services.",
                "b_departments": "<li>Open to all departments within the University<\/li>",
                "b_facilities": "<li>A collection of state of the art technology which help to push the boundaries of research and innovation<\/li><li>High performance computing systems for modelling and visualisation<\/li>",
                "b_background": "3mbuckley.jpg",
                "b_icon_base": "bic",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "bh",
                "b_campus": "huddersfield",
                "b_name": "Barbara Hepworth Building (BH)",
                "b_lat": "53.641584",
                "b_lng": "-1.779106",
                "b_description": null,
                "b_departments": null,
                "b_facilities": "<li>Art Studio Space<\/li><li>PC Labs<\/li><li>Laser Cutting Workshops<\/li><li>3D Printing<\/li><li>Photography Studios<\/li><li>Digital Art Laboratory<\/li>",
                "b_background": "barbarahepworth.jpg",
                "b_icon_base": "bh",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "bh",
                "b_campus": "huddersfield",
                "b_name": "Bridge House",
                "b_lat": "53.645210200000",
                "b_lng": "-1.774678200000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": null,
                "b_icon_base": "h",
                "b_zoom_level": "14",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "wblt",
                "b_campus": "huddersfield",
                "b_name": "Bront\u00eb Lecture Theatres (BL)",
                "b_lat": "53.642923700000",
                "b_lng": "-1.778487000000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": null,
                "b_icon_base": "bl",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "bs",
                "b_campus": "huddersfield",
                "b_name": "Charles Sikes Building (CS)",
                "b_lat": "53.643216400000",
                "b_lng": "-1.776180200000",
                "b_description": "Located in a new \u00a317m building in an attractive waterfront setting on the University's town centre campus, the University of Huddersfield Business School is a dynamic academic community that aims to deliver an inspirational learning experience and pioneering research.\n\nWe are a major provider of business and legal education, with around 6,000 full-time, part-time and distance learning students on Undergraduate honours degrees, Master's courses and doctorates.",
                "b_departments": "<li>Accountancy<\/li><li>Leadership and Management<\/li><li>Logistics and Hospitality Management<\/li><li>Strategy and Marketing<\/li><li>The Law School<\/li>",
                "b_facilities": "<li>The Street social space comprising a wide curving, glazed corridor, with soft seating, tables, WiFi internet access, vending facilities and coffee shop.<\/li><li>Outdoor terrace overlooking the central courtyard.<\/li><li>Special facility for Law students including a mock court room.<\/li><li>Fully equipped teaching space with excellent IT facilities.<\/li><li>Spectacular views of the canal from the roof level terrace.<\/li>",
                "b_background": "charlessikes.jpg",
                "b_icon_base": "cs",
                "b_zoom_level": "17",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 58"
            },
            {
                "b_id": "rw",
                "b_campus": "huddersfield",
                "b_name": "Cockcroft Building (CO)",
                "b_lat": "53.643073300000",
                "b_lng": "-1.779640400000",
                "b_description": "The Cockcroft Building is home to facilities used by the 3D and transport design, and interior design courses.",
                "b_departments": "<li>Art and Design<\/li><li>Architecture and 3D Design<\/li>",
                "b_facilities": null,
                "b_background": "cockroft.jpg",
                "b_icon_base": "co",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "djlt",
                "b_campus": "huddersfield",
                "b_name": "Diamond Jubilee Lecture Theatre (CS1\/01)",
                "b_lat": "53.643060524230",
                "b_lng": "-1.776013970375",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": null,
                "b_icon_base": "djl",
                "b_zoom_level": "17",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "hhrb",
                "b_campus": "huddersfield",
                "b_name": "Edith Key Building (EK)",
                "b_lat": "53.642217800000",
                "b_lng": "-1.778374300000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": "edithkey.jpg",
                "b_icon_base": "ek",
                "b_zoom_level": "17",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "fsd",
                "b_campus": "huddersfield",
                "b_name": "Firth Street Depot (FD)",
                "b_lat": "53.640475100000",
                "b_lng": "-1.778465500000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": "firthstreetdepot.jpg",
                "b_icon_base": "fd",
                "b_zoom_level": "14",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "hwb",
                "b_campus": "huddersfield",
                "b_name": "Harold Wilson Building (HW)",
                "b_lat": "53.643558200000",
                "b_lng": "-1.778513800000",
                "b_description": "The Harold Wilson Building was completed in 1999 and features a large spiral staircase and atrium spanning all three floors. No.10 on the second floor is a popular caf\u00e9  and meeting area.",
                "b_departments": "<li>Human and Health Sciences<\/li>",
                "b_facilities": "<li>Skills Laboratories<\/li><li>Operating Department Practices<\/li><li>Nursing Skills Laboratory<\/li><li>Multi-sensory Room<\/li><li>Number 10 Coffee Bar<\/li><li>Occupational Therapy<\/li>",
                "b_background": "haroldwilson.jpg",
                "b_icon_base": "hw",
                "b_zoom_level": "17",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "ce",
                "b_campus": "huddersfield",
                "b_name": "Haslett Building (HA)",
                "b_lat": "53.641728000000",
                "b_lng": "-1.777537500000",
                "b_description": "The Haslett Building is an impressive 19th century textile mill refurbished for educational use in a series of award-winning developments.",
                "b_departments": "<li>Computing and Engineering<\/li><li>Architecture<\/li><li>3D Design<\/li>",
                "b_facilities": "<li>Design studios<\/li><li>Computer-Aided Engineering equipment<\/li><li>Multimedia and Virtual Reality suites<\/li><li>Architecture studios<\/li><li>Resource centre for computing consumables<\/li><li>Popular caf\u00e9 with roof-top viewing area<\/li>",
                "b_background": "haslett.jpg",
                "b_icon_base": "ha",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "hq",
                "b_campus": "huddersfield",
                "b_name": "Heritage Quay",
                "b_lat": "53.643673484253",
                "b_lng": "-1.776823997498",
                "b_description": "Heritage Quay is the University?s archive service and hosts a programme of regular events, many free to attend (www.heritagequay.org)",
                "b_departments": null,
                "b_facilities": null,
                "b_background": null,
                "b_icon_base": "h",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "wb",
                "b_campus": "huddersfield",
                "b_name": "Joseph Priestly Building (JP)",
                "b_lat": "53.643378500000",
                "b_lng": "-1.780337700000",
                "b_description": "The Joseph Priestly Building is a large Z-shaped building with teaching and office accommodation for the School of Applied Sciences and the School of Music and Humanities. Engineering labs and workshops and the Media studios are located towards the western end.",
                "b_departments": "<li>Applied Sciences<\/li><li>Humanities and Media<\/li>",
                "b_facilities": "<li>Chemical Engineering Laboratory<\/li><li>Resource Centre<\/li><li>Crime Scene Room<\/li><li>NMR Mass Spectrometry Lab<\/li><li>SEM - Electron Microscope<\/li><li>Courtyard cafe<\/li>",
                "b_background": "josephpriestly.jpg",
                "b_icon_base": "jp",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "jmb",
                "b_campus": "huddersfield",
                "b_name": "Journalism & Media Building (JM)",
                "b_lat": "53.642822000000",
                "b_lng": "-1.778814200000",
                "b_description": "The Journalism and Media Building houses the full range of industry standard equipment and software. \u00a3\u00be million was spent in the summer of 2009 on installing digital broadcast facilities that reflect the requirements of the media industry.  ",
                "b_departments": "<li>Journalism and Media<\/li>",
                "b_facilities": "<li>Panasonic HD Television Studio<\/li><li>Two digital radio studios<\/li><li>Radio Production resources<\/li><li>Broadcast media location<\/li><li>Filming and editing suites<\/li><li>IT and Print Production resources<\/li>",
                "b_background": "journalism.jpg",
                "b_icon_base": "jm",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "locb",
                "b_campus": "huddersfield",
                "b_name": "Lockside Building (LS)",
                "b_lat": "53.642119200000",
                "b_lng": "-1.776904500000",
                "b_description": "Opened in 2001 the Lockside Building is a superbly renovated former textile mill building with 17 teaching rooms and four computer labs. There are specialist facilities for school teacher training subjects and computer labs are available outside timetabled hours.",
                "b_departments": "<li>Education and Professional Development<\/li>",
                "b_facilities": "<li>Seventeen teaching rooms<\/li><li>Four computer labs<\/li><li>Specialist facilities for school teacher-training subjects<\/li>",
                "b_background": "lockside.jpg",
                "b_icon_base": "ls",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "ob",
                "b_campus": "huddersfield",
                "b_name": "Oastler Building (OA)",
                "b_lat": "53.644717300000",
                "b_lng": "-1.777446300000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": "oastler.jpg",
                "b_icon_base": "oa",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label marker-label--large",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "qsb",
                "b_campus": "huddersfield",
                "b_name": "Queen St. Building (QSB)",
                "b_lat": "53.642294100000",
                "b_lng": "-1.780552300000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": "queenstreetbuilding.jpg",
                "b_icon_base": "qsb",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "qsa",
                "b_campus": "huddersfield",
                "b_name": "Queen St. South Annexe (QSA)",
                "b_lat": "53.642020600000",
                "b_lng": "-1.780187400000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": "<li>Faith Centre<\/li><li>Islamic Prayer Rooms<\/li>",
                "b_background": null,
                "b_icon_base": "qsa",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "qss",
                "b_campus": "huddersfield",
                "b_name": "Queen Street Studios (QS)",
                "b_lat": "53.640955200000",
                "b_lng": "-1.780772200000",
                "b_description": "Queen Street Studios is home to the department of Architecture and 3D Design. It boasts shared work spaces and dedicated teaching rooms with computer access.",
                "b_departments": "<li>Architecture and 3D Design<\/li>",
                "b_facilities": "<li>Cafe area<\/li><li>Access to a Design Centre with containing key industry and technical resources such as rapid prototyping machines and digital measurment systems<\/li><li>Full workshop<\/li>",
                "b_background": null,
                "b_icon_base": "qs",
                "b_zoom_level": "14",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "rb",
                "b_campus": "huddersfield",
                "b_name": "Ramsden Building (R)",
                "b_lat": "53.642911100000",
                "b_lng": "-1.780418200000",
                "b_description": "This historic building is the oldest on campus and retains many of its Victorian Gothic features. It accommodates about half of the staff from the School of Human and Health Sciences. The Podiatry Clinic is on the ground floor and open to the public.",
                "b_departments": "<li>Art and Design<\/li><li>Human and Health Sciences<\/li>",
                "b_facilities": "<li>Fine Art studios<\/li><li>Two computer labs for Human and Health Sciences<\/li><li>Facilities for physiotherapy, sport and occupational therapy<\/li><li>Resource Centre with copying, binding and scanning facilities together with lab consumables and a small loan collection of books and CDs.<\/li>",
                "b_background": "ramsden.jpg",
                "b_icon_base": "r",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "rh",
                "b_campus": "huddersfield",
                "b_name": "Researcher Hub",
                "b_lat": "53.642052420148",
                "b_lng": "-1.778363585472",
                "b_description": "More than just a place to do research: opened in 2012, the Researcher Hub is a purpose built facility for research and researchers; right in the heart of the campus. The Researcher Hub is a Research and Enterprise initiative set to encourage research students and research staff to collaborate and problem solve with each other, creating an energetic research community space. The Researcher Hub has an array of sophisticated state-of-the-art facilities and hosts a wide range of events including International and National Conferences, Public Lecture Series, research skills training and social gatherings all in the pursuit of building a strong collegiate research community at the heart of the campus.",
                "b_departments": null,
                "b_facilities": null,
                "b_background": null,
                "b_icon_base": "h",
                "b_zoom_level": "17",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 60"
            },
            {
                "b_id": "cab",
                "b_campus": "huddersfield",
                "b_name": "Richard Steinitz (RS)",
                "b_lat": "53.644103584477",
                "b_lng": "-1.777845919132",
                "b_description": "The \u00a315m Creative Arts Building is one of the most exciting and inspirational teaching and research facilities for music and creative arts courses in the University sector. It is home to students studying music and music technology, fashion, creative imaging, multimedia, and business design awareness.",
                "b_departments": "<li>Art and Design<\/li><li>Music<\/li>",
                "b_facilities": "<li>Rehearsal space<\/li>\r\n<li>Phipps Concert Hall<\/li>\r\n<li>Work space and exhibition areas for art and design students<\/li>\r\n<li>Distinctive cube shaped electro acoustic research studio, comprising cutting edge technology to create a world class research facility.<\/li>",
                "b_background": "richardsteinitz.jpg",
                "b_icon_base": "rs",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "csb",
                "b_campus": "huddersfield",
                "b_name": "Schwann Building (SB)",
                "b_lat": "53.643976400000",
                "b_lng": "-1.776958100000",
                "b_description": "The Schwann Building is located by the canal and houses a number of University services.",
                "b_departments": "<li>Business Mine<\/li>\r\n<li>Computing and Library Services<\/li>\r\n<li>External Relations Group<\/li>\r\n<li>Financial Services<\/li>\r\n<li>Human Resources Group<\/li>\r\n<li>Planning and Information Services<\/li>\r\n<li>Registry<\/li>\r\n<li>Student Admissions and Records<\/li>",
                "b_facilities": "<li>Computer rooms located on most floors, consisting of both Mac and PC<\/li>",
                "b_background": "schwann.jpg",
                "b_icon_base": "sb",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "sjrc",
                "b_campus": "huddersfield",
                "b_name": "Sir John Ramsden Court (JR)",
                "b_lat": "53.644415300000",
                "b_lng": "-1.775563400000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": "ramsdencourt.jpg",
                "b_icon_base": "jr",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "mb",
                "b_campus": "huddersfield",
                "b_name": "Sir Patrick Stewart Building (PS)",
                "b_lat": "53.642504000000",
                "b_lng": "-1.780166000000",
                "b_description": "The Sir Patrick Stewart Building houses state of the art performance facilities.",
                "b_departments": "<li>Drama<\/li>",
                "b_facilities": "<li>State of the art performance facilities<\/li>",
                "b_background": "patrickstewart.jpg",
                "b_icon_base": "ps",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "cw",
                "b_campus": "huddersfield",
                "b_name": "Sp\u00e4rck Jones Building (SJ)",
                "b_lat": "53.641231900000",
                "b_lng": "-1.778352900000",
                "b_description": "Sp\u00e4rck Jones Building is an impressive 19th century textile mills refurbished for educational use in a series of award-winning developments. ",
                "b_departments": "<li>Computing and Engineering<\/li><li>Architecture<\/li><li>3D Design<\/li>",
                "b_facilities": "<li>Design studios<\/li><li>Computer-Aided Engineering equipment<\/li><li>Multimedia and Virtual Reality suites<\/li><li>Architecture studios<\/li><li>Resource centre for computing consumables<\/li><li>Popular caf\u00e9 with roof-top viewing area<\/li>",
                "b_background": "sparkjones.jpg",
                "b_icon_base": "sj",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "sph",
                "b_campus": "huddersfield",
                "b_name": "St. Pauls Hall (PLG)",
                "b_lat": "53.643744300000",
                "b_lng": "-1.779634900000",
                "b_description": "The campus concert hall, St. Paul's is a beautifully converted Georgian church. Holding over 70 performances a year, this is an excellent performance space. St Paul's is the venue for a range of concerts, including the world renowned Huddersfield Contemporary Music Festival.  ",
                "b_departments": null,
                "b_facilities": null,
                "b_background": "stpaulshall.jpg",
                "b_icon_base": "plg",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "sc",
                "b_campus": "huddersfield",
                "b_name": "Student Central (SC)",
                "b_lat": "53.644323000000",
                "b_lng": "-1.777263800000",
                "b_description": "Student Central is an exciting and unique hub for students and staff combining access to the library, computing, sport, leisure and eating space all under one roof.  With an eight court sports hall, fitness suite, squash courts, dance studios and a new home for the Students\u2019 Union, there is nothing like it at any other University.  Student support services including careers, welfare support and international support are also easily accessible in one location.",
                "b_departments": null,
                "b_facilities": "<li><strong>Catering<\/strong><\/li>\r\n<li>Campus Kitchen<\/li>\r\n<li>The Deli<\/li>\r\n<li><\/li>\r\n<li><strong>Library<\/strong><\/li>\r\n<li>Computer rooms with Macs and PCs located on most library floors (PCs available 24 hours a day)<\/li>\r\n<li><\/li>\r\n<li><strong>Students\u2019 Union<\/strong><\/li>\r\n<li>Students\u2019 Union Shop<\/li>\r\n<li>Students\u2019 Union support and advisory services<\/li>\r\n<li><\/li>\r\n<li><strong>Sports<\/strong><\/li>\r\n<li>An eight court sports hall with seating for 850 spectators<\/li>\r\n<li>A two-storey fitness suite with over 80 stations from the new Technogym Artis range<\/li>\r\n<li>Two spacious fitness studios<\/li>\r\n<li>Two glass backed squash courts<\/li>\r\n<li>Changing rooms<\/li>\r\n<li>Treatment areas for physiotherapy and beauty therapy<\/li>",
                "b_background": "studentcentral.jpg",
                "b_icon_base": "sc",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "tb",
                "b_campus": "huddersfield",
                "b_name": "Technology Building (T)",
                "b_lat": "53.643731500000",
                "b_lng": "-1.777741300000",
                "b_description": "An extensive workshop and teaching block with looms and studio spaces for Fashion and Textile courses, classrooms, lecture theatres, Engineering workshops and the state of the art recording and mixing facilities of the Blue Room Studios.",
                "b_departments": "<li>Art and Design<\/li><li>Computing and Engineering<\/li>",
                "b_facilities": "<li>Textile exhibition Studios<\/li><li>Automotive Lab<\/li><li>Electrical Workshop<\/li><li>Music Recording Technology<\/li>",
                "b_background": "technology.jpg",
                "b_icon_base": "t",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "tsgblt",
                "b_campus": "huddersfield",
                "b_name": "The Sir George Buckley Lecture Theatre (RH)",
                "b_lat": "53.642408598476",
                "b_lng": "-1.778390407562",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": null,
                "b_icon_base": "rh",
                "b_zoom_level": "16",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "uhc",
                "b_campus": "huddersfield",
                "b_name": "University Health Centre",
                "b_lat": "53.643890500000",
                "b_lng": "-1.775611700000",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": "healthcentre.jpg",
                "b_icon_base": "uhc",
                "b_zoom_level": "15",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
            {
                "b_id": "ur",
                "b_campus": "huddersfield",
                "b_name": "University Reception",
                "b_lat": "53.643699719698",
                "b_lng": "-1.778744459152",
                "b_description": null,
                "b_departments": null,
                "b_facilities": null,
                "b_background": "reception.jpg",
                "b_icon_base": "ur",
                "b_zoom_level": "17",
                "b_map_label_class": "marker-label",
                "b_map_label_offset": "50 57"
            },
        ];

        //group Marker locations, this is so as the user zooms in and out, building markers are grouped together, this 
        //array defines where they are grouped and at what zoom level they first appear, where they dissappear
        var groupMarkers = [
            ['group2.png', 53.642067, -1.778335, 17, 16],
            ['group2.png', 53.643143, -1.776088, 17, 14],
            ['group3.png', 53.642067, -1.778335, 16, 15],
            ['group3.png', 53.642265, -1.780424, 16, 15],
            ['group3.png', 53.643040, -1.780052, 16, 15],
            ['group2.png', 53.642735, -1.778744, 16, 15],
            ['group2.png', 53.643597, -1.778523, 17, 15],
            ['group2.png', 53.641546, -1.777467, 16, 15],
            ['group3.png', 53.644157, -1.776881, 16, 15],
            ['group2.png', 53.644195, -1.775509, 15, 14],
            ['group8.png', 53.641636, -1.778023, 15, 14],
            ['group7.png', 53.644125, -1.777043, 15, 14],
            ['group3.png', 53.643677, -1.779125, 15, 14],
            ['group8.png', 53.642587, -1.779563, 15, 14],
            ['group11.png', 53.642943, -1.779072, 14, 13],
            ['group10.png', 53.641291, -1.778827, 14, 13],
            ['group12.png', 53.644062, -1.776131, 14, 13],
            ['group33.png', 53.642981, -1.777677, 13, 1]
        ];

        //Array that holds accessible routes through the university
        var routes = [
            [
                { lat: 53.644323, lng: -1.7772638 },
                { lat: 53.644153291723455, lng: -1.777467817605105 },
                { lat: 53.644153291723455, lng: -1.777467817605105 },
                { lat: 53.64410227919856, lng: -1.7774911987338782 },
                { lat: 53.644054876097115, lng: -1.777556497194197 },
                { lat: 53.644006272482765, lng: -1.7776829634874147 },
                { lat: 53.643938, lng: -1.777878 },
                { lat: 53.643932011893845, lng: -1.7780416457289228 },
                { lat: 53.643928, lng: -1.778238 },
                { lat: 53.643356, lng: -1.77822 },
                { lat: 53.643319763774606, lng: -1.778252065076189 },
                { lat: 53.643311008995994, lng: -1.7782432393430447 },
                { lat: 53.643283179396164, lng: -1.778234939023693 },
                { lat: 53.643199440161084, lng: -1.778223315995493 },
                { lat: 53.64314801296603, lng: -1.7782200417580118 },
                { lat: 53.643036296022174, lng: -1.778221874223791 },
                { lat: 53.642555, lng: -1.77824 },
                { lat: 53.64253148893285, lng: -1.7781921677624002 },
                { lat: 53.64250892736068, lng: -1.7781633354363335 },
                { lat: 53.64243, lng: -1.778113 },
                { lat: 53.64215, lng: -1.778105 },
                { lat: 53.641947, lng: -1.778138 },
                { lat: 53.64185, lng: -1.778195 },
                { lat: 53.641775, lng: -1.778287 },
                { lat: 53.641636, lng: -1.77821 },
                { lat: 53.641570439846, lng: -1.778183244552729 },
                { lat: 53.641500372598415, lng: -1.778149036408212 },
                { lat: 53.64147978683428, lng: -1.778132244833761 },
                { lat: 53.641469214622454, lng: -1.7781511804619865 }
            ],
            [
                { lat: 53.643928, lng: -1.778238 },
                { lat: 53.64391621302909, lng: -1.7788745089865432 },
                { lat: 53.643885234333794, lng: -1.7790514703582194 },
                { lat: 53.64386933413643, lng: -1.7796026643107798 },
                { lat: 53.64385008593847, lng: -1.7800669592528728 },
                { lat: 53.64385008593847, lng: -1.7800669592528728 },
                { lat: 53.64372924418766, lng: -1.7802278917937664 },
                { lat: 53.64372941158391, lng: -1.7801847485613398 },
            ],
            [
                { lat: 53.64243255087891, lng: -1.7781142679857909 },
                { lat: 53.642446522919876, lng: -1.7773691873968445 },
                { lat: 53.64245016371141, lng: -1.777316461070959 },
                { lat: 53.64245644529029, lng: -1.7772876413300254 },
                { lat: 53.642465985729004, lng: -1.7772584723069884 },
                { lat: 53.642479262895826, lng: -1.777243194509741 },
                { lat: 53.64250152390411, lng: -1.7772274365317786 },
                { lat: 53.64252477869487, lng: -1.7772230779421294 },
                { lat: 53.64303638934438, lng: -1.7772384649234585 },
                { lat: 53.64303464483248, lng: -1.7773172084477795 },
            ],
            [
                { lat: 53.644153291723455, lng: -1.777467817605105 },
                { lat: 53.64421310306072, lng: -1.7774656564770885 },
                { lat: 53.644400282546755, lng: -1.7775002053782885 },
                { lat: 53.644446683749756, lng: -1.7775199476045023 },
                { lat: 53.64446640689349, lng: -1.7775399587807983 },
                { lat: 53.644607269623734, lng: -1.7773343728529967 },
            ],
            [
                { lat: 53.64399966469714, lng: -1.7777036562391468 },
                { lat: 53.6440853757054, lng: -1.7778055011365224 },
            ],
            [
                { lat: 53.64391681265173, lng: -1.7788279377897043 },
                { lat: 53.64389017983773, lng: -1.7788493954618234 },
                { lat: 53.64380436327395, lng: -1.7788522409851204 },
                { lat: 53.64373710894877, lng: -1.778828695499799 },
            ],
            [
                { lat: 53.64380436327395, lng: -1.7788522409851204 },
                { lat: 53.643692105142186, lng: -1.7791159781819421 },
                { lat: 53.64365095229924, lng: -1.7791456366311187 },
                { lat: 53.643450401489225, lng: -1.7792021997809426 },
                { lat: 53.64340525899534, lng: -1.778928581464938 },
                { lat: 53.643400365713845, lng: -1.7789294661220056 },
            ],
            [
                { lat: 53.643450401489225, lng: -1.7792021997809426 },
                { lat: 53.643345152744374, lng: -1.7792546414470722 },
                { lat: 53.64272992070216, lng: -1.779443215446448 },
                { lat: 53.64270701184198, lng: -1.7792682281455985 },
                { lat: 53.642773127727686, lng: -1.779236558992019 },
            ],
            [
                { lat: 53.64270701184198, lng: -1.7792682281455985 },
                { lat: 53.64261696565196, lng: -1.7785163623934408 },
                { lat: 53.642584968467894, lng: -1.7783037167258864 },
                { lat: 53.642573440470024, lng: -1.7782400142617827 },
            ],
            [
                { lat: 53.643450562827624, lng: -1.7792030024463767 },
                { lat: 53.64345910853654, lng: -1.7792634588731815 },
                { lat: 53.64335292507474, lng: -1.7792966713745106 },
                { lat: 53.642936820614814, lng: -1.7794155007954937 },
                { lat: 53.642980269985486, lng: -1.7797290561410617 },
                { lat: 53.64299481104063, lng: -1.779722779298336 },
            ],
            [
                { lat: 53.642980269985486, lng: -1.7797290561410617 },
                { lat: 53.6430627451923, lng: -1.7802468907272728 },
                { lat: 53.64304587261647, lng: -1.7802536356979748 },
            ],
            [
                { lat: 53.6430627451923, lng: -1.7802468907272728 },
                { lat: 53.643109096437925, lng: -1.7805147241773511 },
                { lat: 53.64276967923054, lng: -1.7806438286661108 },
                { lat: 53.642602793248365, lng: -1.779527546526427 },
                { lat: 53.64293651498384, lng: -1.7794154838802445 },
            ],
            [
                { lat: 53.642602793248365, lng: -1.779527546526427 },
                { lat: 53.64257042016374, lng: -1.7795416298115052 },
                { lat: 53.64270108689152, lng: -1.7803586924624426 },
                { lat: 53.64266784442188, lng: -1.7803748943733955 },
            ],
            [
                { lat: 53.64270108689152, lng: -1.7803586924624426 },
                { lat: 53.6427435508306, lng: -1.780653278089095 },
                { lat: 53.642769445582225, lng: -1.7806442622830132 },
            ],
            [
                { lat: 53.6427435508306, lng: -1.780653278089095 },
                { lat: 53.642715442879336, lng: -1.78070676626914 },
                { lat: 53.642503184790755, lng: -1.7807551676696676 },
                { lat: 53.642337875379134, lng: -1.7808211375890348 },
                { lat: 53.64232209800688, lng: -1.7806812408904493 },
            ],
            [
                { lat: 53.642337875379134, lng: -1.7808211375890348 },
                { lat: 53.64219045567148, lng: -1.7808768660161678 },
                { lat: 53.642088441777425, lng: -1.780912818764786 },
                { lat: 53.6420641384591, lng: -1.7807266393888899 },
                { lat: 53.642063629608394, lng: -1.7806669404241582 },
                { lat: 53.642067207306496, lng: -1.7806414594385167 },
                { lat: 53.642074163940805, lng: -1.7806243603560468 },
                { lat: 53.642062773121275, lng: -1.7805500329751567 },
            ],
            [
                { lat: 53.642074163940805, lng: -1.7806243603560468 },
                { lat: 53.64214101281536, lng: -1.7805906827058982 },
                { lat: 53.64214300042179, lng: -1.7804800415840338 },
                { lat: 53.642095695363025, lng: -1.7801347071733664 },
                { lat: 53.642065927839774, lng: -1.7801475354974294 },
            ],
            [
                { lat: 53.642088441777425, lng: -1.780912818764786 },
                { lat: 53.642051854053804, lng: -1.780922386803827 },
                { lat: 53.64191744353892, lng: -1.7809736765547934 },
                { lat: 53.64185433841952, lng: -1.780992060000559 },
                { lat: 53.64184453475275, lng: -1.7809034496157894 },
            ],
            [
                { lat: 53.64185433841952, lng: -1.780992060000559 },
                { lat: 53.64104988957066, lng: -1.781331801742918 },
                { lat: 53.640989281034564, lng: -1.7808442353713017 },
            ],
            [
                { lat: 53.64177449785944, lng: -1.7782876443466789 },
                { lat: 53.64158293932381, lng: -1.7790725632424786 }
            ],
            [
                { lat: 53.64177449785944, lng: -1.7782876443466789 },
                { lat: 53.64164361108804, lng: -1.7785534830137584 },
                { lat: 53.641514463834085, lng: -1.7787782609877723 },
                { lat: 53.641381417429415, lng: -1.7789738296994373 },
                { lat: 53.64126936953847, lng: -1.7791042471543927 },
                { lat: 53.64123665391996, lng: -1.7791281374560697 },
                { lat: 53.64118081630738, lng: -1.7791480155227024 },
                { lat: 53.641134275969485, lng: -1.7791497466692285 },
                { lat: 53.64108656434953, lng: -1.7791269125503728 },
                { lat: 53.64104680744191, lng: -1.7790896849348425 },
                { lat: 53.64098841831567, lng: -1.7790060454902723 },
                { lat: 53.64063678299149, lng: -1.7784638870409375 },
            ],
            [
                { lat: 53.641258007611405, lng: -1.7782507019331506 },
                { lat: 53.641140778222294, lng: -1.7780878327901184 },
                { lat: 53.641605730401594, lng: -1.777454866750836 },
                { lat: 53.641717244634904, lng: -1.7771948640406943 },
                { lat: 53.64221107341971, lng: -1.7766257658794182 },
                { lat: 53.64235310172853, lng: -1.776462027097785 },
                { lat: 53.64238875170582, lng: -1.7765418854445003 },
                { lat: 53.64233142010675, lng: -1.7766825211669879 },
                { lat: 53.64222862164962, lng: -1.7768610281943076 },
            ],
            [
                { lat: 53.64128920331373, lng: -1.7778813736422605 },
                { lat: 53.64122983581382, lng: -1.7775901248818715 },
                { lat: 53.64205740078805, lng: -1.7766146798036409 },
                { lat: 53.64276105039716, lng: -1.7757967991326518 },
            ],
            [
                { lat: 53.641696407321035, lng: -1.7772411174167235 },
                { lat: 53.641640188689884, lng: -1.7771096891749938 },
            ],
            [
                { lat: 53.6421971462812, lng: -1.7766406044626204 },
                { lat: 53.64214317703743, lng: -1.7765185639524428 },
            ],
            [
                { lat: 53.642389984823986, lng: -1.7765399466237164 },
                { lat: 53.64247719526002, lng: -1.776436378460311 },
                { lat: 53.642591316738226, lng: -1.7764933754018775 },
                { lat: 53.64264002125656, lng: -1.7765242916402268 },
                { lat: 53.64273830614066, lng: -1.7762891666936542 },
                { lat: 53.642965860291454, lng: -1.7760440574890013 },
            ],
            [
                { lat: 53.642714454442526, lng: -1.7763514935917768 },
                { lat: 53.642839256523466, lng: -1.7764031261153135 },
                { lat: 53.64286844889358, lng: -1.7764803906290605 },
                { lat: 53.642903041314945, lng: -1.7765007025602175 },
                { lat: 53.64295925826286, lng: -1.7764906442764117 },
                { lat: 53.64304021053622, lng: -1.7764685160520388 },
                { lat: 53.64313943704378, lng: -1.7764378301838923 },
                { lat: 53.64325213408044, lng: -1.7763771124997318 },
                { lat: 53.643384242695674, lng: -1.7762778707661808 },
                { lat: 53.64349836171956, lng: -1.7762805529751957 },
                { lat: 53.643663997216514, lng: -1.7760535143001954 },
                { lat: 53.6442495653981, lng: -1.7752732278592753 }
            ],
            [
                { lat: 53.64286844889358, lng: -1.7764803906290605 },
                { lat: 53.64283578148364, lng: -1.776537333337449 },
                { lat: 53.642811556508136, lng: -1.7769297479359447 },
                { lat: 53.64319134088105, lng: -1.7768687861126353 },
                { lat: 53.643403680922454, lng: -1.7767563697818112 },
                { lat: 53.643474586402554, lng: -1.7766740662131708 },
                { lat: 53.64381272696339, lng: -1.7762562560619743 },
                { lat: 53.643869724965896, lng: -1.7762517502239117 },
                { lat: 53.643958545673385, lng: -1.7761860361030468 },
                { lat: 53.644149853382075, lng: -1.7765610403530596 },
            ],
            [
                { lat: 53.64317768715827, lng: -1.778223897900777 },
                { lat: 53.643067021930676, lng: -1.7787989422858463 },
                { lat: 53.64297032898094, lng: -1.778841187077831 },
                { lat: 53.64295852343117, lng: -1.778898854571651 },
                { lat: 53.64284440294658, lng: -1.7789296999753224 }
            ],
            [
                { lat: 53.64174069002007, lng: -1.7798615575121168 },
                { lat: 53.64205727331604, lng: -1.7797374033848778 },
                { lat: 53.64208261371274, lng: -1.779699370736647 },
                { lat: 53.64256924104132, lng: -1.7795438200486768 }
            ],
            [
                { lat: 53.64345810195312, lng: -1.7792646967413694 },
                { lat: 53.643519939777875, lng: -1.7797555409910948 },
                { lat: 53.64346822087611, lng: -1.7797723047974379 },
            ],
            [
                { lat: 53.64370546987621, lng: -1.7765942825011938 },
                { lat: 53.643727036099754, lng: -1.776564787683026 },
                { lat: 53.64351397215822, lng: -1.7761785495848814 },
                { lat: 53.64345255855765, lng: -1.776125290047641 }

            ]
        ];

        //Array for Polygons to outline buildings
        var polygons = [
            [   //3M Buckley
                { lat: 53.64195866910732, lng: -1.7766787747134805 },
                { lat: 53.64193998552139, lng: -1.7767223606099725 },
                { lat: 53.64187399661976, lng: -1.776788745283091 },
                { lat: 53.641868463039984, lng: -1.7767711960498045 },
                { lat: 53.64182344943391, lng: -1.7768208799262375 },
                { lat: 53.64183537516096, lng: -1.7768520606060356 },
                { lat: 53.64123872487216, lng: -1.7775640054604458 },
                { lat: 53.641164284176604, lng: -1.7773623207605649 },
                { lat: 53.64159869674465, lng: -1.7768556671023572 },
                { lat: 53.64159031613935, lng: -1.7768325462322787 },
                { lat: 53.64174470656231, lng: -1.7766530031094296 },
                { lat: 53.64177094320634, lng: -1.7766969242820485 },
                { lat: 53.64180881475846, lng: -1.7766350055168134 },
                { lat: 53.6417851620483, lng: -1.7765733147094709 },
                { lat: 53.64184455724818, lng: -1.7765027174016912 },
                { lat: 53.64186955245691, lng: -1.7765446269175489 },
                { lat: 53.64190958046737, lng: -1.7764812782561523 },
            ],
            [   //Barbara Hepworth
                { lat: 53.64174209369577, lng: -1.77851859622574 },
                { lat: 53.64133502607221, lng: -1.7793125300941481 },
                { lat: 53.64167212922756, lng: -1.7798489718971267 },
                { lat: 53.641913824171155, lng: -1.7797524123725905 },
            ],
            [   //Bridge House
                { lat: 53.645016265715554, lng: -1.774710766594152 },
                { lat: 53.64514266868111, lng: -1.7746470641300482 },
                { lat: 53.645136706285605, lng: -1.7746028076813025 },
                { lat: 53.645273752340806, lng: -1.774537210760767 },
                { lat: 53.64528567709226, lng: -1.7745895138365575 },
                { lat: 53.64538354398504, lng: -1.7745430336959411 },
                { lat: 53.64540262353605, lng: -1.7746416048772384 },
                { lat: 53.64531459115906, lng: -1.774680736846983 },
                { lat: 53.645313398684884, lng: -1.7746767135334607 },
                { lat: 53.64530226892429, lng: -1.7746824132276173 },
                { lat: 53.64530366014453, lng: -1.7746897893024083 },
                { lat: 53.64516118647755, lng: -1.7747558945994846 },
                { lat: 53.64515919901335, lng: -1.7747444952111713 },
                { lat: 53.645146081747214, lng: -1.7747515360098354 },
                { lat: 53.645148267958525, lng: -1.7747662881594173 },
                { lat: 53.64503183741123, lng: -1.7748198820798788 },
            ],
            [   //Bronte Lecture, Journalism & Joseph Priestley
                { lat: 53.64304935836365, lng: -1.7786693902130168 },
                { lat: 53.64305253846542, lng: -1.778303268682484 },
                { lat: 53.64268602692593, lng: -1.7782683999652904 },
                { lat: 53.64267734968985, lng: -1.7789218727660616 },
                { lat: 53.642680331061555, lng: -1.7789218727660616 },
                { lat: 53.642688961292514, lng: -1.779050238624904 },
                { lat: 53.64275080966733, lng: -1.7793833329757058 },
                { lat: 53.643362177481826, lng: -1.7791875347260322 },
                { lat: 53.643432176216756, lng: -1.7798606794203575 },
                { lat: 53.643231445756236, lng: -1.7799353676712015 },
                { lat: 53.64321656302753, lng: -1.7798948442820972 },
                { lat: 53.64317422806765, lng: -1.7799116080884403 },
                { lat: 53.64315713506713, lng: -1.7798358356837696 },
                { lat: 53.64312470054527, lng: -1.7798484053272157 },
                { lat: 53.643139607243604, lng: -1.7799674283522515 },
                { lat: 53.6431262394651, lng: -1.7799735393322935 },
                { lat: 53.643202899535915, lng: -1.7804801893501732 },
                { lat: 53.64358886849337, lng: -1.780340988566913 },
                { lat: 53.64352757167094, lng: -1.779826630450354 },
                { lat: 53.64346068300159, lng: -1.7798508930827572 },
                { lat: 53.64345054652443, lng: -1.7797710973645642 },
                { lat: 53.64350421019928, lng: -1.779749639692445 },
                { lat: 53.643391251066035, lng: -1.7789083857975996 },
                { lat: 53.643283560660656, lng: -1.7789454689847606 },
                { lat: 53.642845695453374, lng: -1.7791271371352035 },
                { lat: 53.64283434845924, lng: -1.778995327768822 },
                { lat: 53.64283643061936, lng: -1.7786615428339703 },
                { lat: 53.64290679067031, lng: -1.7786642250429852 },
                { lat: 53.64290718818438, lng: -1.7787084814917309 },
                { lat: 53.642969854615124, lng: -1.7787122160509328 },
                { lat: 53.64297223969598, lng: -1.7786672890499333 },
            ],
            [   //Charles Sikes & Diamond Jubilee 
                { lat: 53.64347273046712, lng: -1.7760828901653758 },
                { lat: 53.643433973346525, lng: -1.776165467860138 },
                { lat: 53.64340326644338, lng: -1.776215758815678 },
                { lat: 53.643370043149524, lng: -1.7762511948242654 },
                { lat: 53.6433310558775, lng: -1.7762862777576238 },
                { lat: 53.64329026976073, lng: -1.7763109204714533 },
                { lat: 53.64324997376943, lng: -1.7763266784494158 },
                { lat: 53.643206661443344, lng: -1.776330825289787 },
                { lat: 53.64314881380019, lng: -1.7763255931760047 },
                { lat: 53.64308062046386, lng: -1.7762897041660208 },
                { lat: 53.64305232706644, lng: -1.7762655185921172 },
                { lat: 53.64300323973971, lng: -1.7762082672531077 },
                { lat: 53.64294286462084, lng: -1.7761079513927491 },
                { lat: 53.642982814732825, lng: -1.7760583305259736 },
                { lat: 53.642959361437846, lng: -1.7759979808231385 },
                { lat: 53.642768849842994, lng: -1.7762124878410268 },
                { lat: 53.64270718284053, lng: -1.776065917200782 },
                { lat: 53.64297318334057, lng: -1.7757493276757463 },
                { lat: 53.64300657445756, lng: -1.7758103479308351 },
                { lat: 53.643018102337045, lng: -1.7757979427141413 },
                { lat: 53.643012139641165, lng: -1.7757821847361788 },
                { lat: 53.64317912436358, lng: -1.7755856272423376 },
                { lat: 53.64319124846299, lng: -1.7756030616009344 },
                { lat: 53.64322372005661, lng: -1.775566204155199 },
                { lat: 53.64331949296986, lng: -1.7756415125910063 },
                { lat: 53.643323865581706, lng: -1.7756267604414244 },
                { lat: 53.64351289179198, lng: -1.7757821983146171 },
                { lat: 53.64352951194652, lng: -1.7757730282949935 },
                { lat: 53.64359667373831, lng: -1.7758283592612623 },
                { lat: 53.643619729171554, lng: -1.775935647621858 },
                { lat: 53.64359028421121, lng: -1.7760446977154332 },
                { lat: 53.64351456598085, lng: -1.776082086525741 },
            ],
            [   //cockcroft
                { lat: 53.64331230627331, lng: -1.7797676540177565 },
                { lat: 53.64330455482256, lng: -1.7797093159716826 },
                { lat: 53.64333387314317, lng: -1.7796981926914057 },
                { lat: 53.64332604039836, lng: -1.7796459645122042 },
                { lat: 53.64329881094573, lng: -1.7796550169676295 },
                { lat: 53.643259537771605, lng: -1.7793692377506787 },
                { lat: 53.64296271674316, lng: -1.77948035055002 },
                { lat: 53.6430167062305, lng: -1.7798801460218083 },
            ],
            [   //Edith Key, George Buckley & Researcher Hub
                { lat: 53.64247265615571, lng: -1.7783843942426336 },
                { lat: 53.64248259410885, lng: -1.7783123098753584 },
                { lat: 53.64246212192283, lng: -1.7782761000536573 },
                { lat: 53.64241629037358, lng: -1.7782858625027065 },
                { lat: 53.64237324222485, lng: -1.7782707390361074 },
                { lat: 53.642348100499824, lng: -1.7783084151147444 },
                { lat: 53.642311329944256, lng: -1.77830673873411 },
                { lat: 53.64231271998578, lng: -1.778255838160634 },
                { lat: 53.64230317951238, lng: -1.7782548323322533 },
                { lat: 53.64230437207167, lng: -1.7782149344731568 },
                { lat: 53.64225825975449, lng: -1.7782109111596345 },
                { lat: 53.6422574442506, lng: -1.7782542447797267 },
                { lat: 53.642105943928065, lng: -1.7782448999042533 },
                { lat: 53.642103757559035, lng: -1.7783163137192748 },
                { lat: 53.64207696997263, lng: -1.7783157850920528 },
                { lat: 53.64207776501644, lng: -1.7782544295608371 },
                { lat: 53.64186382860508, lng: -1.7782401506433687 },
                { lat: 53.64186164222353, lng: -1.7783528034219942 },
                { lat: 53.64189880667074, lng: -1.7783566214976898 },
                { lat: 53.641898087042314, lng: -1.7783928847549868 },
                { lat: 53.64188297593293, lng: -1.7783919572682194 },
                { lat: 53.64188210304021, lng: -1.7784430595391543 },
                { lat: 53.64190774331355, lng: -1.7784444006436617 },
                { lat: 53.64190881053279, lng: -1.7784208255920508 },
                { lat: 53.64206907910618, lng: -1.7784307806501487 },
                { lat: 53.64206828406222, lng: -1.7784837542781928 },
                { lat: 53.642308593792194, lng: -1.7784987190799506 },
                { lat: 53.64230998511121, lng: -1.778449098213175 },
                { lat: 53.64234757112192, lng: -1.7784524749885144 },
                { lat: 53.64236685080603, lng: -1.7784917022953572 },
                { lat: 53.642412505536534, lng: -1.7784781067580413 },
                { lat: 53.64245703573467, lng: -1.7784962527750103 },
                { lat: 53.64247989303185, lng: -1.7784608794709844 },
            ],
            [   //firth depot
                { lat: 53.64048817919794, lng: -1.7785447973329438 },
                { lat: 53.64036266978408, lng: -1.77834821741504 },
                { lat: 53.640416138619116, lng: -1.7782483051292353 },
                { lat: 53.64025651569299, lng: -1.7780075198330936 },
                { lat: 53.640224315016916, lng: -1.7780661931552943 },
                { lat: 53.64014770776093, lng: -1.7779529253362103 },
                { lat: 53.64009688349455, lng: -1.7780471379278584 },
                { lat: 53.64045205054308, lng: -1.7786015553584633 },
            ],
            [   //Harold Wilson
                { lat: 53.64360118824885, lng: -1.7788765285163466 },
                { lat: 53.643604618895964, lng: -1.7788765812158314 },
                { lat: 53.64360894359291, lng: -1.7786372142480045 },
                { lat: 53.64360576353307, lng: -1.778630844001594 },
                { lat: 53.64362772483191, lng: -1.7785959786055638 },
                { lat: 53.643857760993235, lng: -1.7786062254330304 },
                { lat: 53.64385915226111, lng: -1.7785552634617474 },
                { lat: 53.64387863000673, lng: -1.7785371647893866 },
                { lat: 53.643894331448166, lng: -1.7785086663186034 },
                { lat: 53.643902522739836, lng: -1.7784689119995467 },
                { lat: 53.64390550402496, lng: -1.7784447721184127 },
                { lat: 53.64390556505792, lng: -1.7784052079687362 },
                { lat: 53.64386183952191, lng: -1.7784025257597214 },
                { lat: 53.64386183952191, lng: -1.7782808205256706 },
                { lat: 53.64350746487567, lng: -1.7782676716824164 },
                { lat: 53.643505874841956, lng: -1.7783860241551985 },
                { lat: 53.64347824799674, lng: -1.7784275983949294 },
                { lat: 53.643411629690284, lng: -1.778425455028545 },
                { lat: 53.64340571580116, lng: -1.7788687126033098 },
                { lat: 53.64348097355829, lng: -1.778875035480072 },
                { lat: 53.64348057604962, lng: -1.7789444376383323 },
                { lat: 53.64352527995231, lng: -1.7789444152747813 },
                { lat: 53.64354595037632, lng: -1.7789289925729457 },
                { lat: 53.64356230393597, lng: -1.7789108915711882 },
                { lat: 53.64357144661674, lng: -1.7788941277648451 },
                { lat: 53.64357442792527, lng: -1.7788763581301215 },
            ],
            [   //Haslett & Lockside
                { lat: 53.641494376703044, lng: -1.7781260674964794 },
                { lat: 53.641872510050234, lng: -1.777522082574443 },
                { lat: 53.64187628652643, lng: -1.777529793925361 },
                { lat: 53.64219870861182, lng: -1.777038748439248 },
                { lat: 53.6422177896037, lng: -1.7769726990422563 },
                { lat: 53.642199702413684, lng: -1.776956605788167 },
                { lat: 53.64223276128652, lng: -1.7768406628306521 },
                { lat: 53.64222719600008, lng: -1.7768352984126223 },
                { lat: 53.642263171588695, lng: -1.7767085640366687 },
                { lat: 53.642237531531435, lng: -1.7766867710884227 },
                { lat: 53.64221134606678, lng: -1.7766503422439017 },
                { lat: 53.64172082841648, lng: -1.7772287436456757 },
                { lat: 53.641710975768596, lng: -1.777236709768697 },
                { lat: 53.64169805619268, lng: -1.777255820507928 },
                { lat: 53.6416893106314, lng: -1.7772719137620174 },
                { lat: 53.64167842293814, lng: -1.7772904661511824 },
                { lat: 53.64167047242423, lng: -1.777310917994921 },
                { lat: 53.64166550335226, lng: -1.7773293581818983 },
                { lat: 53.64166259727746, lng: -1.777355924768349 },
                { lat: 53.64166305303708, lng: -1.7773770795812105 },
                { lat: 53.64166961221233, lng: -1.7774085955371355 },
                { lat: 53.6416786982151, lng: -1.7774290749984423 },
                { lat: 53.64165762935008, lng: -1.7774773547607103 },
                { lat: 53.64164510728384, lng: -1.7774609262304941 },
                { lat: 53.64160931133323, lng: -1.7775124873122183 },
                { lat: 53.641632765378944, lng: -1.7775584201415984 },
                { lat: 53.64139390791191, lng: -1.7779450210419112 },
            ],
            [   //Heritage Quay, Schwann, Quayside, Student Central, Oastler
                { lat: 53.643442028658264, lng: -1.7772042090103524 },
                { lat: 53.64346886050965, lng: -1.777205214838733 },
                { lat: 53.643472040579795, lng: -1.777169005017032 },
                { lat: 53.64361918308245, lng: -1.7771656437068817 },
                { lat: 53.64361938183616, lng: -1.7771837486177322 },
                { lat: 53.643757290007954, lng: -1.7771887338773973 },
                { lat: 53.64375967504428, lng: -1.7772567949311502 },
                { lat: 53.64388662407279, lng: -1.7772626121203805 },
                { lat: 53.64389775420701, lng: -1.7771610234539414 },
                { lat: 53.64400106023657, lng: -1.7770183404761886 },
                { lat: 53.644059389844365, lng: -1.77706645050421 },
                { lat: 53.64431468381992, lng: -1.7772304005260686 },
                { lat: 53.644323230086485, lng: -1.7772448173995237 },
                { lat: 53.644328198845315, lng: -1.777292426609538 },
                { lat: 53.644389495925445, lng: -1.7773815261877335 },
                { lat: 53.64441681065059, lng: -1.7774043974824516 },
                { lat: 53.64443912620604, lng: -1.7774017044635038 },
                { lat: 53.644467746170264, lng: -1.7773782351346235 },
                { lat: 53.64447748490366, lng: -1.7773634829850415 },
                { lat: 53.64448841613233, lng: -1.777321238193057 },
                { lat: 53.64448922100807, lng: -1.7772961007529475 },
                { lat: 53.64448067477513, lng: -1.7772458093339183 },
                { lat: 53.64454572832025, lng: -1.7771811737832466 },
                { lat: 53.6446248393564, lng: -1.7773797693406257 },
                { lat: 53.6445531230059, lng: -1.7775088306974673 },
                { lat: 53.644648945535195, lng: -1.777687753793007 },
                { lat: 53.644669557371834, lng: -1.777666954435131 },
                { lat: 53.644700402954015, lng: -1.7777182711370587 },
                { lat: 53.64497557808637, lng: -1.7772912637964922 },
                { lat: 53.64494556723478, lng: -1.7772302435414034 },
                { lat: 53.64499766919231, lng: -1.77714660713858 },
                { lat: 53.645031853694555, lng: -1.7770530650991856 },
                { lat: 53.64505769079995, lng: -1.776955164470142 },
                { lat: 53.64506723065028, lng: -1.7768881092447697 },
                { lat: 53.64506643566281, lng: -1.776839158930248 },
                { lat: 53.645059877015846, lng: -1.7767898733395993 },
                { lat: 53.64503417491181, lng: -1.7767182085693811 },
                { lat: 53.64501012651616, lng: -1.7766850162328218 },
                { lat: 53.6449693539293, lng: -1.7766631736782967 },
                { lat: 53.64491393650126, lng: -1.7766551446825884 },
                { lat: 53.64486555494055, lng: -1.7766571563393496 },
                { lat: 53.644700555193864, lng: -1.7767501916568995 },
                { lat: 53.6447444786087, lng: -1.7769293553071352 },
                { lat: 53.644691611506516, lng: -1.7769702589946124 },
                { lat: 53.64461662660864, lng: -1.7767069007775582 },
                { lat: 53.64477998189948, lng: -1.7765601235429718 },
                { lat: 53.644612436195665, lng: -1.7760012252227475 },
                { lat: 53.64429446592643, lng: -1.7762717964491515 },
                { lat: 53.644274988372864, lng: -1.7762188228211073 },
                { lat: 53.64421536315298, lng: -1.7762805136284499 },
                { lat: 53.64426664084716, lng: -1.7764743032297758 },
                { lat: 53.6441986680763, lng: -1.7766278596958784 },
                { lat: 53.64394293557872, lng: -1.7761874386215282 },
                { lat: 53.64378286075734, lng: -1.776443924346327 },
                { lat: 53.64378206574569, lng: -1.7765411544231169 },
                { lat: 53.643852821724224, lng: -1.7766665476945631 },
                { lat: 53.64379717096456, lng: -1.7767530489352934 },
                { lat: 53.64365404281949, lng: -1.7765147637131595 },
                { lat: 53.643490181708145, lng: -1.7767776678323743 },
                { lat: 53.64348938669097, lng: -1.7769540230751035 },
                { lat: 53.6434389030699, lng: -1.7769546936273573 },
            ],
            [   //Queen Stree Building
                { lat: 53.64243140321855, lng: -1.780625298691596 },
                { lat: 53.64240437194774, lng: -1.7804643661507025 },
                { lat: 53.64239721660846, lng: -1.7804683894642248 },
                { lat: 53.642332818500215, lng: -1.7800821513660803 },
                { lat: 53.64227716573485, lng: -1.7801062912472143 },
                { lat: 53.64227160045427, lng: -1.7800861746796026 },
                { lat: 53.64224884398408, lng: -1.780093833433134 },
                { lat: 53.64225281918671, lng: -1.7801162969336337 },
                { lat: 53.642239899776804, lng: -1.7801219966277904 },
                { lat: 53.642190414572845, lng: -1.7798389415375238 },
                { lat: 53.64209310762287, lng: -1.7798842502777235 },
                { lat: 53.642202808560306, lng: -1.7805669386239975 },
                { lat: 53.64219287054124, lng: -1.7805719677659004 },
                { lat: 53.6421992308737, lng: -1.7806152183862656 },
                { lat: 53.6421945105613, lng: -1.7806183587980962 },
                { lat: 53.64221299527418, lng: -1.7807296704722142 },
            ],
            [   //Queen Street South Annexe
                { lat: 53.64212717778508, lng: -1.7805185512494903 },
                { lat: 53.64201384225553, lng: -1.7798407770466484 },
                { lat: 53.64187510028691, lng: -1.7799074459599784 },
                { lat: 53.64198792786286, lng: -1.7805850223532715 },
            ],
            [   //Queen Street Studios
                { lat: 53.64107873303547, lng: -1.7808110920307096 },
                { lat: 53.64097119351874, lng: -1.7800601811082672 },
                { lat: 53.640771053801416, lng: -1.780128359189228 },
                { lat: 53.64080292254832, lng: -1.7803952064079698 },
                { lat: 53.64084955957096, lng: -1.7803818186205111 },
                { lat: 53.64087718813808, lng: -1.7806071241777621 },
                { lat: 53.64085355774936, lng: -1.7806147974169662 },
                { lat: 53.64088396904598, lng: -1.780878995004933 },
            ],
            [   //Ramsden
                { lat: 53.64308278722598, lng: -1.7804986245563947 },
                { lat: 53.642927361131775, lng: -1.7795179339051281 },
                { lat: 53.64263785448697, lng: -1.77963163209637 },
                { lat: 53.64278464422134, lng: -1.780619939079482 },
                { lat: 53.642851053771246, lng: -1.7805948037266428 },
                { lat: 53.642862581693244, lng: -1.7806095558762247 },
                { lat: 53.64286317796498, lng: -1.7806098911523516 },
                { lat: 53.642873115826085, lng: -1.7806095558762247 },
                { lat: 53.64288563752779, lng: -1.7806035209059412 },
                { lat: 53.642896370411954, lng: -1.7805850807189638 },
                { lat: 53.64289557538361, lng: -1.7805780399202997 },
                { lat: 53.642977592444225, lng: -1.7805432516513942 },
                { lat: 53.642988126548374, lng: -1.7805549863158343 },
                { lat: 53.642998064380045, lng: -1.7805539804874537 },
                { lat: 53.64301396490584, lng: -1.7805478960663068 },
                { lat: 53.64301972884497, lng: -1.7805314675360906 },
                { lat: 53.64301913257544, lng: -1.780525767841934 },
            ],
            [   //Richard Steinitz
                { lat: 53.64454631909124, lng: -1.7778094386554533 },
                { lat: 53.64448086765537, lng: -1.7776721790814465 },
                { lat: 53.64446655768016, lng: -1.7776862606787747 },
                { lat: 53.64441687450077, lng: -1.7776001019212262 },
                { lat: 53.64439799325377, lng: -1.7776188773843304 },
                { lat: 53.644363361265086, lng: -1.7775559770324834 },
                { lat: 53.64432043120523, lng: -1.7776019098618634 },
                { lat: 53.64429750631529, lng: -1.7775650294879086 },
                { lat: 53.644244984261434, lng: -1.77760947143629 },
                { lat: 53.64409551986131, lng: -1.777773802543272 },
                { lat: 53.6440510349298, lng: -1.7778461823596725 },
                { lat: 53.644108076614174, lng: -1.7779246369733581 },
                { lat: 53.644065742549174, lng: -1.7780214487082269 },
                { lat: 53.644018630962904, lng: -1.778147682449247 },
                { lat: 53.643957614115976, lng: -1.7783629297226922 },
                { lat: 53.64405074134736, lng: -1.7784242003132134 },
                { lat: 53.64410738987834, lng: -1.7782538292767947 },
                { lat: 53.644151711413286, lng: -1.778294397688145 },
                { lat: 53.6441209205182, lng: -1.7784170475513905 },
                { lat: 53.644089716549665, lng: -1.7785638984949559 },
                { lat: 53.64418596555943, lng: -1.778615359772615 },
                { lat: 53.64421435233844, lng: -1.7785160188484084 },
                { lat: 53.64426702128827, lng: -1.7783215586948287 },
                { lat: 53.64433598770048, lng: -1.7781411801385771 },
                { lat: 53.64441449399787, lng: -1.7779933233666312 },
                { lat: 53.644491877866166, lng: -1.7778758582755372 },
            ],
            [   //John Ramsden Court
                { lat: 53.644519849935456, lng: -1.7756261724216316 },
                { lat: 53.64448208752524, lng: -1.775537994800267 },
                { lat: 53.64449009032794, lng: -1.7755276168349798 },
                { lat: 53.644482248047936, lng: -1.7755091766480025 },
                { lat: 53.64450490549804, lng: -1.7754796723488386 },
                { lat: 53.644487813036825, lng: -1.7754478211167868 },
                { lat: 53.64446932932095, lng: -1.775469278788906 },
                { lat: 53.64445740433866, lng: -1.7754421214226301 },
                { lat: 53.644491788028425, lng: -1.7753985355261381 },
                { lat: 53.64445800058786, lng: -1.7753257806066092 },
                { lat: 53.6443845760583, lng: -1.7754160486731907 },
                { lat: 53.644378613555624, lng: -1.7754083373222729 },
                { lat: 53.64435879459747, lng: -1.775432962447392 },
                { lat: 53.64436257085106, lng: -1.7754443618357052 },
                { lat: 53.644333752065165, lng: -1.7754849302470554 },
                { lat: 53.6444391476391, lng: -1.775724964818295 },
            ],
            [   //Patrick Stewart
                { lat: 53.642711711563955, lng: -1.7806825132116577 },
                { lat: 53.64268786060208, lng: -1.7805651665672562 },
                { lat: 53.64267593511607, lng: -1.7805715368136665 },
                { lat: 53.64265148785922, lng: -1.780412951205661 },
                { lat: 53.64267116492074, lng: -1.7804049045786163 },
                { lat: 53.64255822757562, lng: -1.7796511428278206 },
                { lat: 53.642342512400354, lng: -1.779729051626353 },
                { lat: 53.64239249313143, lng: -1.780121290745278 },
                { lat: 53.6424191268912, lng: -1.7801142499466138 },
                { lat: 53.64244118917197, lng: -1.780273506106873 },
                { lat: 53.64240779760739, lng: -1.7802869171519475 },
                { lat: 53.64243548042635, lng: -1.780485010225732 },
                { lat: 53.642461517881536, lng: -1.7804783047031947 },
                { lat: 53.64248911560964, lng: -1.7806777865664425 },
                { lat: 53.6425175381383, lng: -1.7806700752155247 },
                { lat: 53.642523898421814, lng: -1.780710643626875 },
                { lat: 53.64254997990047, lng: -1.7807044538355354 },
                { lat: 53.642550377417926, lng: -1.7807108240819458 },
                { lat: 53.64261239137409, lng: -1.7807047883912785 },
                { lat: 53.64265114924969, lng: -1.780677295748876 },
                { lat: 53.642654528139694, lng: -1.7807017709061368 },
            ],
            [   //Spark Jones
                { lat: 53.641479162235605, lng: -1.778167573771836 },
                { lat: 53.64137243190279, lng: -1.778008943207352 },
                { lat: 53.64134281601602, lng: -1.7780676165295528 },
                { lat: 53.641346990068406, lng: -1.7780759984327243 },
                { lat: 53.64123918945584, lng: -1.7782870345751056 },
                { lat: 53.64120738706006, lng: -1.778240095917345 },
                { lat: 53.641193473504345, lng: -1.7782672532836208 },
                { lat: 53.64103542873815, lng: -1.7780280199259368 },
                { lat: 53.64072339380326, lng: -1.7784677113920333 },
                { lat: 53.64106242632953, lng: -1.7789928085463314 },
                { lat: 53.64145634940805, lng: -1.778238495912956 },
                { lat: 53.6414485976162, lng: -1.7782267612485159 },
            ],
            [   //St Pauls
                { lat: 53.64380859657671, lng: -1.780063047614 },
                { lat: 53.64382134752618, lng: -1.7796310566273377 },
                { lat: 53.64384340907345, lng: -1.7796337388363526 },
                { lat: 53.64384619161014, lng: -1.7795727185812638 },
                { lat: 53.64378398199633, lng: -1.7795666836109802 },
                { lat: 53.643785373266645, lng: -1.7795499198046372 },
                { lat: 53.64376383167692, lng: -1.7794947736928801 },
                { lat: 53.643724940729946, lng: -1.779490861466777 },
                { lat: 53.64370228286083, lng: -1.7795384706767914 },
                { lat: 53.64370128909436, lng: -1.7795626105579254 },
                { lat: 53.64366690476009, lng: -1.7795595930727837 },
                { lat: 53.6436531309164, lng: -1.7800497244996283 },
                { lat: 53.643689900302135, lng: -1.7800524067086432 },
                { lat: 53.64369009905548, lng: -1.7800597827834341 },
                { lat: 53.643702421761304, lng: -1.780060118059561 },
                { lat: 53.64369981037932, lng: -1.7801639605789643 },
                { lat: 53.6437023941722, lng: -1.7801726777582627 },
                { lat: 53.64370577297798, lng: -1.7801787127285462 },
                { lat: 53.643711338069345, lng: -1.7801830713181954 },
                { lat: 53.6437214744838, lng: -1.7801854182510835 },
                { lat: 53.64374254231782, lng: -1.7801834065943223 },
                { lat: 53.64374899281094, lng: -1.7801753870115444 },
                { lat: 53.64375336537828, lng: -1.780166669832246 },
                { lat: 53.643757141686066, lng: -1.780152252958791 },
                { lat: 53.64375894149117, lng: -1.7801302771338512 },
                { lat: 53.643760332762334, lng: -1.7800709332593967 },
                { lat: 53.643772854200606, lng: -1.7800712685355236 },
                { lat: 53.643773649212434, lng: -1.7800602044233371 },
            ],
            [   //Technology
                { lat: 53.64387776530541, lng: -1.778113587823884 },
                { lat: 53.64388777415001, lng: -1.7773484292603947 },
                { lat: 53.642492518941516, lng: -1.7772976225444204 },
                { lat: 53.64248311641056, lng: -1.7780580008925062 },
                { lat: 53.64267236980327, lng: -1.778064565585895 },
                { lat: 53.64267157477069, lng: -1.7781530784833866 },
                { lat: 53.64273945456007, lng: -1.7781549013505238 },
                { lat: 53.64274024959138, lng: -1.778110644901778 },
                { lat: 53.64280439752685, lng: -1.7781128886220676 },
                { lat: 53.642803602496784, lng: -1.7781591567275745 },
                { lat: 53.64287053767587, lng: -1.7781617977570696 },
                { lat: 53.64287113394751, lng: -1.778114859099309 },
                { lat: 53.64292308990284, lng: -1.7781168537205772 },
                { lat: 53.64292249363196, lng: -1.7781647982067184 },
                { lat: 53.6430866557697, lng: -1.7781706700833233 },
                { lat: 53.643087053282066, lng: -1.7781244019778164 },
                { lat: 53.64324496074819, lng: -1.7781300159291602 },
                { lat: 53.643244364481845, lng: -1.778178966243682 },
                { lat: 53.64344380245901, lng: -1.7781869484439627 },
                { lat: 53.643444001213524, lng: -1.7781386686816947 },
                { lat: 53.64350725553927, lng: -1.7781417497147234 },
                { lat: 53.64350685803085, lng: -1.7781870119918497 },
                { lat: 53.643574733433624, lng: -1.7781894212804983 },
                { lat: 53.64357532969532, lng: -1.7781428178988645 },
                { lat: 53.643654551915596, lng: -1.778146060316279 },
                { lat: 53.64365409417904, lng: -1.778195887283811 },
                { lat: 53.64377414927833, lng: -1.7781994780783128 },
                { lat: 53.64377494429011, lng: -1.778109288800187 },
            ],
            [   //Health Centre
                { lat: 53.64401558618144, lng: -1.7755509827138916 },
                { lat: 53.64389213324915, lng: -1.775314128205625 },
                { lat: 53.64372633574637, lng: -1.7755505993257503 },
                { lat: 53.64383990270242, lng: -1.7757967086339232 },
                { lat: 53.64389481215372, lng: -1.7757275881267254 },
                { lat: 53.64389202962024, lng: -1.7757218884325687 },
            ],
            [   //Reception
                { lat: 53.64374155264464, lng: -1.7788191808242115 },
                { lat: 53.64374433518804, lng: -1.7787836415547642 },
                { lat: 53.643742546410145, lng: -1.7787397203821453 },
                { lat: 53.64373618631041, lng: -1.7787045163888249 },
                { lat: 53.643724603327904, lng: -1.7786695216011772 },
                { lat: 53.64370452925131, lng: -1.7786447111677894 },
                { lat: 53.643680283813076, lng: -1.7786269415330658 },
                { lat: 53.643656454031834, lng: -1.7786241230005784 },
                { lat: 53.64363677743, lng: -1.7786268052095933 },
                { lat: 53.64362266592204, lng: -1.778646921777205 },
                { lat: 53.64361928710959, lng: -1.77867843773313 },
                { lat: 53.6436200821243, lng: -1.7787139770025773 },
                { lat: 53.64362882728526, lng: -1.7787642684216065 },
                { lat: 53.64364413131259, lng: -1.7788038310045762 },
                { lat: 53.64366659045951, lng: -1.7788269650573296 },
                { lat: 53.643698192247726, lng: -1.7788393702740235 },
                { lat: 53.64371906134017, lng: -1.778840376102404 },
                { lat: 53.643731781543856, lng: -1.7788376938933892 },

            ]
        ];

        //Array for campus outline
        var campusOutline = [
            {lat: 53.6451277625752, lng: -1.7771237501574921},
            {lat: 53.64490357584431, lng: -1.777450979657309},
            {lat: 53.64464354630045, lng: -1.7779099791030206},
            {lat: 53.64448941922058, lng: -1.7782350336501596},
            {lat: 53.64438007247839, lng: -1.778459186098822},
            {lat: 53.644263141089766, lng: -1.7787204856199823},
            {lat: 53.644155936407856, lng: -1.7790091381914874},
            {lat: 53.64412646167225, lng: -1.7791136575020339},
            {lat: 53.64409918935885, lng: -1.7792368501887457},
            {lat: 53.644045923944404, lng: -1.7796038666446123},
            {lat: 53.64400934112016, lng: -1.7797724251065805},
            {lat: 53.64397157825286, lng: -1.7799219582591608},
            {lat: 53.6439256432386, lng: -1.780061812896232},
            {lat: 53.64381159147984, lng: -1.7802392992491667},
            {lat: 53.64376537505513, lng: -1.7803144551932748},
            {lat: 53.64364494474115, lng: -1.7804049777856767},
            {lat: 53.6431333062196, lng: -1.7806168657552468},
            {lat: 53.64292123662433, lng: -1.7807198412668046},
            {lat: 53.64277357972458, lng: -1.7807339012037393},
            {lat: 53.64262101485625, lng: -1.7807848159121886},
            {lat: 53.642502565705406, lng: -1.7807876989505966},
            {lat: 53.64238803810019, lng: -1.7808072053227941},
            {lat: 53.64218865596281, lng: -1.780884989384226},
            {lat: 53.642101140112274, lng: -1.780958963974939},
            {lat: 53.640882433505276, lng: -1.7813759051346567},
            {lat: 53.64075089780393, lng: -1.7801302493408033},
            {lat: 53.641079899641404, lng: -1.7792246610697315},
            {lat: 53.64068949426201, lng: -1.7784501425753718},
            {lat: 53.64125182015061, lng: -1.7776840979880482},
            {lat: 53.64115588099292, lng: -1.7773508140916872},
            {lat: 53.641585221469306, lng: -1.7768198101664368},
            {lat: 53.6417354344702, lng: -1.7766249882007767},
            {lat: 53.64190589299747, lng: -1.776361194308047},
            {lat: 53.642041816905504, lng: -1.776806883551778},
            {lat: 53.642219934948386, lng: -1.7765733299988606},
            {lat: 53.64316499378193, lng: -1.7754505914230512},
            {lat: 53.64359065690242, lng: -1.775760497758525},
            {lat: 53.64389668448594, lng: -1.775264966950998},
            {lat: 53.64405147881158, lng: -1.775543629159686},
            {lat: 53.644472035197104, lng: -1.7752687027356595},
            {lat: 53.64483600622746, lng: -1.7760601233562778},
            {lat: 53.64493458509473, lng: -1.7763428552532723},
            {lat: 53.64516751650269, lng: -1.7769074602509072},

        ];

        //  Array of disabled entrance coordinates and floor level number
        var disabledEntrances = [
            [{ lat: 53.64388781837239, lng: -1.7774911325136689 }, 0],
            [{ lat: 53.643034768749445, lng: -1.7773181988881492 }, 0],
            [{ lat: 53.64249113077009, lng: -1.7774935931098557 }, 0],
            [{ lat: 53.642486360553846, lng: -1.7778771489989853 }, 0],
            [{ lat: 53.644593859666465, lng: -1.77729219537049 }, 0],
            [{ lat: 53.64409133004246, lng: -1.777811021474569 }, 0],
            [{ lat: 53.64416146832149, lng: -1.7765682309997177 }, 0],
            [{ lat: 53.643735415976046, lng: -1.7788281743261147 }, 0],
            [{ lat: 53.64360662374777, lng: -1.778648466322117 }, 0],
            [{ lat: 53.64373002573584, lng: -1.7801792769862668 }, 0],
            [{ lat: 53.64346332831314, lng: -1.7797730183527327 }, 0],
            [{ lat: 53.64299755582815, lng: -1.7797198976549722 }, 0],
            [{ lat: 53.64304486970639, lng: -1.780253921462307 }, 0],
            [{ lat: 53.64266675165736, lng: -1.7803755463601 }, 0],
            [{ lat: 53.64206498790424, lng: -1.7801479695436884 }, 0],
            [{ lat: 53.64098958541919, lng: -1.7808424435456738 }, 0],
            [{ lat: 53.64173929575266, lng: -1.7798539682034553 }, 0],
            [{ lat: 53.64158386315834, lng: -1.7790767981413902 }, 0],
            [{ lat: 53.641900696160825, lng: -1.7782619672852418 }, 0],
            [{ lat: 53.642097469865504, lng: -1.778315072314376 }, 0],
            [{ lat: 53.64230104999635, lng: -1.778230252615931 }, 0],
            [{ lat: 53.64098957764116, lng: -1.778849906340143 }, 0],
            [{ lat: 53.641111247749166, lng: -1.7781320849578885 }, 0],
            [{ lat: 53.64125555125661, lng: -1.7782563127938666 }, 0],
            [{ lat: 53.641675925264025, lng: -1.7774231081531844 }, 0],
            [{ lat: 53.642215183700955, lng: -1.7768743199493442 }, 0],
            [{ lat: 53.6419220704907, lng: -1.7765846583842904 }, 0],
            [{ lat: 53.64297366626885, lng: -1.776032637677405 }, 0],
            [{ lat: 53.64345180277445, lng: -1.7761247201030894 }, 1],
            [{ lat: 53.64146875022357, lng: -1.7781521286460578 }, 1],
            [{ lat: 53.641487783408635, lng: -1.7781145244968033 }, 1],
            [{ lat: 53.643986097365364, lng: -1.7770321872446004 }, 4],
            [{ lat: 53.64370301191185, lng: -1.7765978557091633 }, 2],
            [{ lat: 53.64378450068116, lng: -1.7765442115288654 }, 2],
        ];

        // Array of food markers building name, coordinates and text for the info window
        var foodMarkers =
            [
                { loc: 'Charles Sikes', lat: 53.64316114629931, lng: -1.7762545795236462, text: '<li>Oriental Noodle Bar, Level 1</li><li>Street Cafe, Level 1</li>' },
                { loc: 'Student Central', lat: 53.644448287076, lng: -1.776944575217707, text: '<li>International Kitchen, Level 4</li><li>Irie Eats Caribbean Food, Level 4</li><li>NEO Pizza & Pasta, Level 4</li><li>Cafe Central, Level 4</li><li>Veggie Hut, Level 5</li>' },
                { loc: 'Oastler', lat: 53.644691111717634, lng: -1.7772598422886765, text: '<li>Oastler Coffee Pod, Level 4</li>' },
                { loc: 'Haslett', lat: 53.64177246797786, lng: -1.7774383522543857, text: '<li>The Mill Cafe, Level 2' },
                { loc: 'Sp\u00e4rck Jones', lat: 53.641322815050174, lng: -1.7782027154326974, text: '<li>Espresso Deli @ Weavers, Ground Floor</li>' },
                { loc: 'Barbara Hepworth', lat: 53.641580126965565, lng: -1.779144623309552, text: '<li>Coffee Pod, Ground Floor</li>' },
                { loc: 'Sovereign Design House', lat: 53.641876345980826, lng: -1.780794139990578, text: '<li>The Toast House</li>' },
                { loc: 'Joseph Priestley', lat: 53.64338067801307, lng: -1.7789811715339376, text: '<li>Caffeine Lab, Ground Floor</li>' },
                { loc: 'Harold Wilson', lat: 53.643629630799964, lng: -1.7785588934182828, text: '<li>Burrito Cantina at No.10 Cafe, Level 1' }
            ];


        var neutralToilets = [
            ['Charles Sikes', 53.64333654840196, -1.7761161763077582, ['CS1/30']],
            ['Joseph Priestley', '53.64342412926947', '-1.7794209456278587', ['JPSG/09', 'JPSG/10', 'JPSG/11', 'JPSG/12', 'JPS1/13', 'JPS1/14', 'JPS1/15', 'JPS1/16', 'JPS1/17', 'JPS2/13', 'JPS2/14', 'JPS2/15', 'JPS2/16', 'JPS2/17']],
            ['Schwann', 53.64401803852337, -1.7767890789225471, ['SB5/09']],
            ['Sovereign Design House', 53.641895027194515, -1.78077570723024, ['SDG/05']],
            ['Student Central', 53.64440464894501, -1.7770517558822907, ['SC4/06']],
        ];

        var accessibilityToilets = [
            ['Buckley Innovation Centre', 53.64160111376426, -1.7770653397051772, ['BIC1/06', 'BIC2/06', 'BICG/04', 'BICG/05', 'BICG/11']],
            ['Atkinson Holt', 53.645196188391616, -1.7746996157625938, ['AHG/03']],
            ['Bronte Lecture Theatre', 53.64286834615016, -1.7784748881499213, ['BL1/10', 'BLG/02', 'BLG/13']],
            ['Haslett', 53.641685365401756, -1.7776527930781238, ['HA1/01A', 'HA2/01A', 'HA3/02', 'HA4/02', 'HAG/01A', 'HAG/27']],
            ['Sp\u00e4rck Jones', 53.641166988843686, -1.778575472979247, ['SJ2/13', 'SJ4/15', 'SJG/09', 'SJG/14', 'SJG/34']],
            ['Richard Steinitz', 53.644151582912855, -1.777918296865879, ['RS1/36', 'RS2/09', 'RS3/35', 'RSG/06']],
            ['Edith Key', 53.64218788656618, -1.7783729169859686, ['EK1/06', 'EK2/05', 'EK3/08', 'EKG/06']],
            ['Firth Street', 53.6403496681864, -1.7782621361668705, ['FDG/08']],
            ['Harold Wilson', 53.64354449780995, -1.778488255853985, ['HW1/22', 'HW2/34', 'HW3/35', 'HWG/24']],
            ['Charles Sikes', 53.64314402166264, -1.7761821042256232, ['CS1/32', 'CS1/01D', 'CS2/41', 'CS3/08', 'CSG/30']],
            ['Lockside', 53.64210674916864, -1.7769770173585808, ['LS1/07', 'LS2/05', 'LSG/04']],
            ['Oastler', 53.64482329934865, -1.7771986878101953, ['OA3/15', 'OA4/23', 'OA5/23', 'OA6/20', 'OA7/36']],
            ['Queen St. Building', 53.64226693367971, -1.7803973737654633, ['QSBG/07', 'QSBG/12', 'QSBG/18']],
            ['Queen St. South Annexe', 53.64202270219083, -1.7803565501756147, ['QSA/04']],
            ['Queen St. Studios', 53.640955498149374, -1.780541488115197, ['QSS1/05', 'QSS2/04', 'QSSG/08']],
            ['Ramsden', 53.64295989482017, -1.780050695455444, ['R1/03A', 'R2/01', 'R3/03', 'RG/07',]],
            ['Researcher Hub', 53.64198036919985, -1.7783514736219241, ['RHG/04']],
            ['Schwann', 53.64400054836105, -1.7767220236971748, ['SB1/08', 'SB10/02', 'SB12/01', 'SB2/09', 'SB2/24', 'SB3/15', 'SB3/40', 'SB4', 'SB5/04', 'SB5/09', 'SB6/07', 'SB6/56', 'SB7/27', 'SB9/02']],
            ['Sir John Ramsden Court', 53.64440045751192, -1.7754855335008024, ['JRG/05']],
            ['Sir Patrick Stewart', 53.64255492236371, -1.7803952556044167, ['PS1/04', 'PS2/07', 'PSG/10']],
            ['St Pauls', 53.643731877929824, -1.7799191722460606, ['PLG/05']],
            ['Student Central', 53.6444094682853, -1.7769466923875465, ['SC2/01', 'SC3/10', 'SC3/11', 'SC4/03', 'SC4/33', 'SC5/04', 'SC6/02']],
            ['Technology', 53.64336885032716, -1.7777524262797928, ['T5/18', 'TC/02', 'TC/04', 'TC/06']],
            ['Barbara Hepworth', 53.64165744296578, -1.7794600096804514, ['BHG/01', 'BH1/06', 'BH3/04', 'BH4/05']],
            ['Sovereign Design House', 53.64188561412218, -1.7807658598240095, ['SDG/06', 'SDB/05']],
            ['Cockcroft', 53.64316503659108, -1.7796242726818123, ['CO/08']],
            ['Joseph Priestley', 53.643345407309916, -1.7801767255495848, ['JPW2/77', 'JPWG/77', 'JPEG/108', 'JPE1/106', 'JPE2/105', 'JPE3/106', 'JPSG/23', 'JPS1/29', 'JPS2/28']],
        ];

        //empty arrays that get populated with google.maps overlay objects. This is to iterate over created objects to disable them if the user selects to hide a specific object type.
        var addedGroupMarkers = [];
        var createdAccessibilityToilets = [];
        var createdRoutes = [];
        var createdPolygons = [];
        var createdDisabledEntrances = [];
        var createdFoodMarkers = [];
        var createdNeutralToilets = [];



        //GOOGLE MAP CREATION


        //creates options for a google map, grabs the DOM and creates a new google map with the mapOptions
        var mapOptions = {
            center: new google.maps.LatLng(53.644045, -1.777420),
            zoom: 16,
            disableDefaultUI: false,
            mapTypeControl: true,
            gestureHandling: "greedy",
            //map style JSON information
            styles: [
                {
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "lightness": "30"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f5f2f1"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "lightness": -10
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "lightness": 30
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#cfcfcf"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#002448"
                        },
                        {
                            "weight": 0.5
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#e7e6e4"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#bcbcbc"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "color": "#bcbcbc"
                        },
                        {
                            "weight": 1
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#002448"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]
        };
        //creates an google map object using preset map options and attaches it to the dom
        var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);




        //GPS CREATION


        //creates a gps marker if geolocation is enabled on users device and places it on the map
        function gps() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    infoLoc = new google.maps.InfoWindow();
                    geoMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        map: map,
                    });
                    infoLoc.setContent('<p class = "geoText">You are here!</p>');
                    infoLoc.open(map, geoMarker);

                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // in case Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }







        //FOOD MARKER CREATION


        //function that creates a single foodMarker. This is called later in initialiseFoodMarkers() and looped with foodMarkers array.
        function createFoodMarker(foodMarkers) {

            var foodMarker = new google.maps.Marker({
                position: new google.maps.LatLng(foodMarkers[i].lat, foodMarkers[i].lng),
                map: map,
                icon: iconBase + "Food" + png
            });
            return foodMarker;
        }


        //adds an on click event to each marker to display the food in the 
        //corresponding building
        function createFoodInfo(foodMarker, foodMarkers, map, i) {
            var foodInfo = new google.maps.InfoWindow({
            });
            google.maps.event.addListener(foodMarker, 'click', function () {
                if (foodInfo.getMap() === null) {
                    var foodText = ("<div class = 'foodWindow'><h3>" + foodMarkers[i].loc + "</h3>" + foodMarkers[i].text + "</div>");
                    foodInfo.setContent(foodText);
                    foodInfo.open(map, foodMarker);
                }
                else {
                    foodInfo.close();
                }
            });
        }






        //BUILDING MARKER CREATION AND BUILDING FINDER FUNCTIONALITY


        //Iterates through each building and creates buttons for each building in the array
        function createButtons(buildings, i) {
            for (i = 0; i < buildings.length; i++) {
                var button = document.createElement("button");
                button.setAttribute('class', 'button buttonC');
                button.setAttribute('onclick', 'topFunction()');
                var buttonP = document.createElement("p");
                buttonP.setAttribute('class', 'buttonP buttonP' + i);
                buttonP.innerHTML = buildings[i].b_name;
                button.id = "button" + i;
                document.getElementById('buildingList').appendChild(button);
                document.getElementById("button" + i).appendChild(buttonP);
            }
        }

        //Creates disabled entrances on the map
        function createDisabledMarker(disabledEntrances) {
            for (i = 0; i < disabledEntrances.length; i++) {
                var disabledMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(disabledEntrances[i][0], disabledEntrances[i][1]),
                    map: map,
                    icon: iconBase + "disabledentrance" + disabledEntrances[i][1] + png
                });
                createdDisabledEntrances.push(disabledMarker);
            }
        };

        //code to create a single building marker        
        function createBuildingMarker(buildings) {
            //creates the building marker and places it on the map with lat and lang coordinates and sets a custom icon
            var buildingMarker = new google.maps.Marker({
                position: new google.maps.LatLng(buildings[i].b_lat, buildings[i].b_lng),
                map: map,
                icon: iconBase + buildings[i].b_icon_base + png
            });
            //makes marker invisible if initial zoom level of the map makes it overlap other icons
            if (buildings[i].b_zoom_level >= map.getZoom()) {
                buildingMarker.setVisible(false);
            }
            //return the local variable for when the function is called
            return buildingMarker;
        };

        //creation if the info panel for a building icon, this will show the name, facilities and image of the building
        function createBuildingInfo(currentMarker, buildings, map, i) {
            //empty strings to initialise image and facilities field, also stops undefined errors if building doesn't have an image or facility info
            var img = "";
            var facilities = "";
            //create an infoWindow
            buildingInfo = new google.maps.InfoWindow();
            //when clicked on, populate the local variables above with building information for the selected building marker and set the content to
            //that specific marker
            google.maps.event.addListener(currentMarker, 'click', function () {
                if (buildingInfo.getMap() === null) {
                    if (buildings[i].b_facilities != null) {
                        facilities = "<div class = 'facilities'><h4>Facilities</h4>" + buildings[i].b_facilities + "</div>";
                    }
                    if (buildings[i].b_background != null) {
                        img = "<img height='100px' src='" + iconBase + buildingIconBase + buildings[i].b_background + "'>";
                    }
                    buildingInfo.setContent("<div class = 'infoWindow'><div><h3 class = 'locname'>" + buildings[i].b_name + "</div><div><div class = 'infoContentWrap'>" + img + facilities + "</div></div></div></div>");
                    buildingInfo.open(map, currentMarker);
                }
                //if the info panel for the building is already opened when clicked on, close it instead.
                else {
                    buildingInfo.close();
                }
            });
        };

        //zoom functionality for building markers and building finder buttons
        function zoomCurrentMarker(currentMarker, map) {
            //adds event listener to zoom into the location marker when clicked on
            google.maps.event.addListener(currentMarker, 'click', (function (currentMarker) {
                return function () {
                    map.setZoom(18);
                    map.panTo(currentMarker.position);
                };
            })(currentMarker));
            //event listener for the building finder buttons. When clicked on, will zoom the map to the selected building
            google.maps.event.addDomListener(document.getElementById('button' + i), 'click', (function () {
                return function () {
                    map.setZoom(18);
                    map.panTo(currentMarker.position);
                };
            })(currentMarker));
        }





        //TOILET MARKER CREATION

        function createNeutralToilet() {
            //create a marker, grab the coordinates from the list of group markers, stick it on the map and apply the custom icon
            var neutralToilet = new google.maps.Marker({
                position: new google.maps.LatLng(neutralToilets[i][1], neutralToilets[i][2]),
                map: map,
                icon: iconBase + 'neutralbathroom' + png
            });
            return neutralToilet;
        }

        function createDisabledToilet() {
            //create a marker, grab the coordinates from the list of group markers, stick it on the map and apply the custom icon
            var disabledToilet = new google.maps.Marker({
                position: new google.maps.LatLng(accessibilityToilets[i][1], accessibilityToilets[i][2]),
                map: map,
                icon: iconBase + 'disabledtoilet' + png
            });
            return disabledToilet;
        }


        function createDisabledToiletInfo(disabledToilet, accessibilityToilets, map, i) {
            var disabledToiletInfo = new google.maps.InfoWindow({
            });
            google.maps.event.addListener(disabledToilet, 'click', function () {
                if (disabledToiletInfo.getMap() === null) {
                    var toiletText = "<div class='toiletText'><h3>" + accessibilityToilets[i][0] + " Accessibility Toilets</h3><br/>";
                    for (j = 0; j < accessibilityToilets[i][3].length; j++) {
                        toiletText += "<li>" + accessibilityToilets[i][3][j] + "</li>";
                    };
                    toiletText += "</div>";
                    disabledToiletInfo.setContent(toiletText);
                    disabledToiletInfo.open(map, disabledToilet);
                }
                else {
                    disabledToiletInfo.close();
                }
            });
        }



        function createNeutralToiletInfo(neutralToilet, neutralToilets, map, i) {
            var neutralToiletInfo = new google.maps.InfoWindow({
            });
            google.maps.event.addListener(neutralToilet, 'click', function () {
                if (neutralToiletInfo.getMap() === null) {
                    var toiletText = "<div class='toiletText'><h3>" + neutralToilets[i][0] + " Gender Neutral Toilets</h3><br/>";
                    for (j = 0; j < neutralToilets[i][3].length; j++) {
                        toiletText += "<li>" + neutralToilets[i][3][j] + "</li>";
                    };
                    toiletText += "</div>";
                    neutralToiletInfo.setContent(toiletText);
                    neutralToiletInfo.open(map, neutralToilet);
                }
                else {
                    neutralToiletInfo.close();
                }
            });
        }


        //GROUP MARKER CREATION AND FUNCTIONALITY 


        //creation code for a group marker
        function createGroupMarker() {
            //create a marker, grab the coordinates from the list of group markers, stick it on the map and apply the custom icon
            var groupMarker = new google.maps.Marker({
                position: new google.maps.LatLng(groupMarkers[i][1], groupMarkers[i][2]),
                map: map,
                icon: iconBase + groupMarkers[i][0]
            });
            return groupMarker;
        }

        //on initialisation of the markers, gets the zoom level of the map and hides the groupMarkers if the 
        //zoom level is more or less than the specified levels for a marker to be shown. This is specified within 
        //the groupMarker array with groupMarkers[i][3] being the upper limit for it to dissapear and 
        //groupMarkers[i][4]+1 being the lower limit. 
        //NOTE: Unlike the legend, this is not deleting the markers, just hiding them. 
        function GroupZoomInitialise(groupMarker) {
            if (map.getZoom() > groupMarkers[i][3]) {
                groupMarker.setVisible(false);
            }
            if (map.getZoom() < (groupMarkers[i][4] + 1)) {
                groupMarker.setVisible(false);
            }
        }

        //code to add an event listener to a group marker to zoom the map to the point where the groupMarker 
        //disappears and the buildingMarkers appear. Event listener within locMakerZoom that watch the map 
        //zoom level automatically trigger from this event and so group and building markers will appear and disappear.
        function groupClick(map, groupMarker) {
            google.maps.event.addListener(groupMarker, 'click', (function (groupMarker, i) {
                return function () {
                    map.setZoom(groupMarkers[i][3] + 1);
                    map.panTo(groupMarker.position);
                };
            })(groupMarker, i));
        }


        //ZOOM FUNCTIONALITY FOR ALL BUILDING MARKERS


        //event listeners and functionality to show and hide group markers
        function locMarkerZoom(map, buildings, markers, groupMarkers, addedGroupMarkers) {
            //sets zoomListener as an eventListener for the zoom level of the map changing
            zoomListener = google.maps.event.addListener(map, 'zoom_changed', function () {
                var zoom = map.getZoom();
                //checks if the map is zoomed out further than when a markers specified outer zoom
                //level. If it is zoomed out to far and overlapping other markers, it will hide the marker
                //otherwise it is shown.
                for (i = 0; i < buildings.length; i++) {
                    markers[i].setVisible(zoom > buildings[i].b_zoom_level);
                };
                //shows and hides the group markers based on upper and lower limit for them to be in view
                for (i = 0; i < groupMarkers.length; i++) {
                    if (zoom <= groupMarkers[i][3]) {
                        addedGroupMarkers[i].setVisible(true);
                    }
                    else if (zoom >= groupMarkers[i][3]) {
                        addedGroupMarkers[i].setVisible(false);
                    }
                    if (zoom <= groupMarkers[i][4]) {
                        addedGroupMarkers[i].setVisible(false);
                    }
                    else if (zoom <= groupMarkers[i][4]) {
                        addedGroupMarkers[i].setVisible(true);
                    }
                };
            });
        }



        //LEGEND FUNCTIONALITY


        //jquery event listener to check if gps tickbox has been changed
        function legendFilter() {
            $('#gps').change(function () {
                //if its been unchecked, delete the gps marker off of the map
                if ($('#gps:checked').length == 0) {
                    geoMarker.setMap(null);
                    infoLoc.setMap(null);
                }
                //if its been checked, recall the function that creates the GPS icon
                else if ($('#gps:checked').length > 0) {
                    gps();
                }
            });

            $('#neutralToilet').change(function () {
                //if the routes checkbox is unchecked
                if ($('#neutralToilet:checked').length == 0) {
                    //loops through the array storing route objects and deletes them
                    for (i = 0; i < createdNeutralToilets.length; i++) {
                        createdNeutralToilets[i].setMap(null);
                    }
                }
                //if the building checkbox is checked, re-enitialise the routes
                else if ($('#neutralToilet:checked').length > 0) {
                    initialiseNeutralToilets();
                }
            });

            $('#accessibleToilet').change(function () {
                //if the routes checkbox is unchecked
                if ($('#accessibleToilet:checked').length == 0) {
                    //loops through the array storing route objects and deletes them
                    for (i = 0; i < createdAccessibilityToilets.length; i++) {
                        createdAccessibilityToilets[i].setMap(null);
                    }
                }
                //if the building checkbox is checked, re-enitialise the routes
                else if ($('#accessibleToilet:checked').length > 0) {
                    initialiseAccessibilityToilets();
                }
            });

            //jquery event listener to check if building tickbox has changed
            $('#buildings').change(function () {
                //if the buildings checkbox is unchecked
                if ($('#buildings:checked').length == 0) {
                    //loops through the arrays storing marker and groupMarker objects and deletes them
                    for (i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                    }
                    for (i = 0; i < addedGroupMarkers.length; i++) {
                        addedGroupMarkers[i].setMap(null);
                    }
                    //delete the zoomlistener and empty arrays
                    google.maps.event.removeListener(zoomListener);
                    markers = [];
                    addedGroupMarkers = [];
                }
                //if the building checkbox is checked, re-enitialise building and groupMarkers
                //and re-enitialise the zoom functionality.
                else if ($('#buildings:checked').length > 0) {
                    initialiseBuildingMarkers(buildings, map);
                    initialiseGroupMarkers();
                    locMarkerZoom(map, buildings, markers, groupMarkers, addedGroupMarkers);
                }
            });

            //jquery event listener to check if routes tickbox has changed
            $('#routes').change(function () {
                //if the routes checkbox is unchecked
                if ($('#routes:checked').length == 0) {
                    //loops through the array storing route objects and deletes them
                    for (i = 0; i < createdRoutes.length; i++) {
                        createdRoutes[i].setMap(null);
                    }
                }
                //if the building checkbox is checked, re-enitialise the routes
                else if ($('#routes:checked').length > 0) {
                    createRoutes();
                }
            });

            //jquery event listener to check if building tickbox has changed
            $('#buildingOutlines').change(function () {
                //if the routes checkbox is unchecked
                if ($('#buildingOutlines:checked').length == 0) {
                    //loops through the array storing route objects and deletes them
                    for (i = 0; i < createdPolygons.length; i++) {
                        createdPolygons[i].setMap(null);
                    }
                }
                //if the building checkbox is checked, re-enitialise the routes
                else if ($('#buildingOutlines:checked').length > 0) {
                    createBuildingPolygons();
                }
            });

            $('#disabledEntrances').change(function () {
                //if the routes checkbox is unchecked
                if ($('#disabledEntrances:checked').length == 0) {
                    //loops through the array storing route objects and deletes them
                    for (i = 0; i < createdDisabledEntrances.length; i++) {
                        createdDisabledEntrances[i].setMap(null);
                    }
                }
                //if the building checkbox is checked, re-enitialise the routes
                else if ($('#disabledEntrances:checked').length > 0) {
                    createDisabledMarker(disabledEntrances);
                }
            });

            $('#food').change(function () {
                //if the routes checkbox is unchecked
                if ($('#food:checked').length == 0) {
                    //loops through the array storing route objects and deletes them
                    for (i = 0; i < createdFoodMarkers.length; i++) {
                        createdFoodMarkers[i].setMap(null);
                    }
                }
                //if the building checkbox is checked, re-enitialise the routes
                else if ($('#food:checked').length > 0) {
                    initialiseFoodMarkers(foodMarkers);
                }
            });
        }



        //ACCESSIBLE ROUTES & Building Polygons

        //creates lines on the maps using google.maps.Polylines
        function createRoutes() {
            //iteration through an array that holds the lat and lang coordinates of a route
            for (i = 0; i < routes.length; i++) {
                var route = new google.maps.Polyline({
                    path: routes[i],
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.5,
                    strokeWeight: 3
                });
                //add the route to the map
                route.setMap(map);
                //add the route to an array, this will be iterated over to show and hide routes in the legend
                createdRoutes.push(route);
            }
        };

        //creates polygons on the maps using google.maps.Polygons, currently not in use
        function createBuildingPolygons() {
            //iteration through an array that holds the lat and lang coordinates of polygons
            for (i = 0; i < polygons.length; i++) {
                var buildingPolygon = new google.maps.Polygon({
                    paths: polygons[i],
                    strokeColor: '#062359',
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    fillColor: '#FFFFFF',
                    fillOpacity: .7
                });
                //adds current polygon to the map
                buildingPolygon.setMap(map);
                //add the polygon to an array, this will be iterated over to show and hide routes in the legend
                createdPolygons.push(buildingPolygon);
            }
        };

        function createCampusOutline() {
                var campusPolygon = new google.maps.Polygon({
                    paths: campusOutline,
                    strokeColor: '#062359',
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    fillColor: '#062359',
                    fillOpacity: 0.05
                });
                campusPolygon.setMap(map);
        }

        //dev tool to give latitude and langitude coordinates on mouse click. Enable/comment out as required
        google.maps.event.addListener(map, 'click', function (event) {
            alert("{lat: " + event.latLng.lat() + ", lng: " + event.latLng.lng() + "},");
        });


        //INITIALISATION OF FUNCTIONS

        //initialisation of all code relating to group markers
        function initialiseGroupMarkers() {
            //for each marker in groupMarkers
            for (i = 0; i < groupMarkers.length; i++) {
                //create a marker with information on current item through the groupMarker array
                var groupMarker = createGroupMarker();
                //set the marker as visible or invisible based on zoom level of the map
                GroupZoomInitialise(groupMarker);
                groupClick(map, groupMarker);
                addedGroupMarkers.push(groupMarker);
            }
        }

        function initialiseNeutralToilets() {

            for (i = 0; i < neutralToilets.length; i++) {
                var neutralToilet = createNeutralToilet();
                createdNeutralToilets.push(neutralToilet);
                createNeutralToiletInfo(neutralToilet, neutralToilets, map, i);
            }
        }

        function initialiseAccessibilityToilets() {
            for (i = 0; i < accessibilityToilets.length; i++) {
                var disabledToilet = createDisabledToilet();
                createdAccessibilityToilets.push(disabledToilet);
                createDisabledToiletInfo(disabledToilet, accessibilityToilets, map, i);
            }
        }


        //initialises all code relating to the creation and functionality of building markers by looping over each item in building array
        //and calling each previous function with the current items information
        function initialiseBuildingMarkers(buildings) {
            for (i = 0; i < buildings.length; i++) {
                //get the returned buildingMarker from createBuildingMarker and set it as a local variable
                var currentMarker = createBuildingMarker(buildings);
                //create the buildingInfo panel for the marker. Sets up an event listener to show information when a marker is clicked on
                createBuildingInfo(currentMarker, buildings, map, i);
                //creates the event listeners for the currentMarker to zoom to the marker when clicked on directly or selected in the buildingFinder.
                zoomCurrentMarker(currentMarker, map);
                //adds the currentMarker into an array to be iterated through in later functions (when showing and hiding in the legend etc.).
                markers.push(currentMarker);
            }
        }

        function initialiseFoodMarkers(foodMarkers) {
            for (i = 0; i < foodMarkers.length; i++) {
                var foodMarker = createFoodMarker(foodMarkers);
                createFoodInfo(foodMarker, foodMarkers, map, i);
                createdFoodMarkers.push(foodMarker);
            }
        }


        //main function to initialise functions
        function main() {
            // gps();
            createButtons(buildings, i);
            legendFilter();
            initialiseGroupMarkers();
            initialiseBuildingMarkers(buildings, map);
            locMarkerZoom(map, buildings, markers, groupMarkers, addedGroupMarkers);
            createBuildingPolygons();
            createCampusOutline();
        }
        main();
    }
    google.maps.event.addDomListener(window, "load", initialise);
})();