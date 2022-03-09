console.log("client site js");

document.addEventListener("contextmenu",(e)=>{
	e.preventDefault();
})

setInterval(()=>{
	let date=new Date()
	let hour=date.getHours();
	let minute=date.getMinutes();
	let second=date.getSeconds();
	// console.log(hour+"   "+minute+"    "+second);
	if(hour>=11 && minute>=0 && second>=0 && hour<=12 && minute<=59 && second<=59){
		document.querySelector(".no_exam").style.opacity=0;
		document.querySelector(".questions").style.opacity=1;
		document.querySelector(".questions").style.width=56+"%";
	}

	if(hour==12 && minute>=0 && second>=0){
		document.querySelector(".no_exam").style.opacity=1;
		document.querySelector(".questions").style.opacity=0;
		document.querySelector(".questions").style.width=0+"%";
	}
	// console.log(document.querySelector(".questions"));
},1000)