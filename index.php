<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="detectify-verification" 
    			content="b0a9db528e2be60512632426449c6c97" />
		<title>David Woldenberg</title>
		<link rel="stylesheet" href="http://dwold.com/public/css/style.css" />
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	    <script type="text/javascript" src="/public/js/functions.js"></script>
	    <script type="text/javascript" src="/public/js/jquery.fullPage.js"></script>

	    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'>
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

		<!--Adapted from: https://www.codecademy.com/MrMKenyon/codebits/79Stl2/edit-->

	    <script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-XXXXXXXXXXXXXXX', 'auto');
		  ga('send', 'pageview');

		</script>
	</head>

	<body>
		<div id="fullpage">
			<div id="mainSec" class="section">
				<div class="title">
					[ David Woldenberg ]
				</div>
				<div class="subtitle">
					{ Web developer | Student | Entrepreneur }
				</div>
				<main>
					<ul>
			        	<a href="#about"><li class="about" data-menuanchor="about"><i class="fa fa-phone"></i><span>About</span></li></a>
			        	<a href="#projects"><li class="projects span2" data-menuanchor="projects"><i class="fa fa-comments"></i><span>Projects</span></li></a>
			        	<a href="#contactme"><li class="contactme" data-menuanchor="contactme"><i class="fa fa-user"></i><span>Contact Me</span></li></a>
			        	<a href="#k4k"><li class="k4k" data-menuanchor="k4k"><i class="fa fa-search"></i><span>K4K</span></li></a>
			        	<a href="#ihw"><li class="ihw" data-menuanchor="ihw"><i class="fa fa-envelope"></i><span>iHW</span></li></a>
			        	<a href="#living"><li class="living" data-menuanchor="living"><i class="fa fa-instagram"></i><span>Living Planet</span></li></a>
			        	<a href="#hwchron"><li class="hwchron" data-menuanchor="hwchron"><i class="fa fa-gears"></i><span>HW Chronicle</span></li></a>
			        </ul>
			    </main>
			</div>
			<div id="About" class="section">
				My Name is David Woldenberg and I am a programmer. I became interested in the art after an introductory course in ninth grade and have since entrhalled myself in it. My expertise is in web programming, but I am learning IOS development and pretty much anything that interests me. I graduated from Harvard Westlake School, where I took four years of comptuer science courses. I am now a student at the Unviersity of Chicago, where I am majoring in Computer Science and Economics. I like to create web apps and web sites, but I'm always open to working on something new.
			</div>
			<div id="Projects" class="section">
			</div>
			<div id="k4k" class="section">
			</div>
			<div id="ihw" class="section">
			</div>
			<div id="living  planet" class="section">
			</div>
			<div id="hwchronicle" class="section">
			</div>
		</div>
		<div class="bottom">
			<div class="contact" id="email">
				<i class="fa fa-phone"></i>
			</div>
			<div class="contact" id="link">
				<i class="fa fa-phone"></i>
			</div>
			<div class="contact" id="git">
				<i class="fa fa-phone"></i>
			</div>
			<div class="contact" id="stack">
				<i class="fa fa-phone"></i>
			</div>
			<div class="contact" id="fb">
				<i class="fa fa-phone"></i>
			</div>
			<div class="contact" id="twitt">
				<i class="fa fa-phone"></i>
			</div>
		</div>
		<script>
			$(document).ready(function() {
				$('#fullpage').fullpage({
					sectionsColor: ['black', 'rgb(27, 161, 226)', 'rgb(240, 163, 10)', 'rgb(119, 221, 119)', 'rgb(130, 111, 214)', 'rgb(255, 105, 97)', 'rgb(162, 0, 37)', 'rgb(100, 118, 135)'],
					anchors: ['mainSec', 'about', 'projects', 'contactme', 'k4k', 'ihw', 'living', 'hwchron'],
					menu: '#menu'
				});
			});
		</script>
	</body>
</html> 