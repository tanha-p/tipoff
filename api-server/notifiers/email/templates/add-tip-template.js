
export default function getAddTipEmailBody (tip) {
    return `<div style="font-family:Courier New;color:#333;">
				<div style="background-color:#e1f4f3;color:#333;padding:.5em;font-weight:700;font-size:2em">
					<span style="margin-top:-1em">${tip && tip.project && tip.project.project_name}</span>
				</div>
				
				<div style="padding:1em">
					${tip.created_on}
				</div>
				<div style="padding:1em">
					Tipoff has received a new <strong>${tip.event_type}</strong> event Tip with title 
					<strong>${tip.event_title}</strong>
				</div>
				<div style="padding:1em">
					<a clicktracking=off  href="${tip.tip_url}" target="_new"><button  
						style="background-color:#333;color:#e1f4f3;padding:1em;border-radius:4px;font-size:1em"
					>View Tip Details</button></a>
				</div>
				<div style="padding:1em">
					or copy and paste below URL into the browser to view the Tip.
				</div>
				<div style="padding:0em 1em">
					${tip.tip_url}
				</div>
			</div>`
};