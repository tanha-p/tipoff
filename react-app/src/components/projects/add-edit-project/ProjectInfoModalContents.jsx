import React from 'react'

export const ProjectNameInfoModalContent = () => {
    return (
        <>
            Project Name is a human readable label associated with every Project ID. This can be changed at any time in future.
        </>
    )
}

export const EventTypeInfoModalContent = () => {
    return (
        <>
            <div>
                To add a new event type, input the case-sensitive event type and click on Add button associated with the input box. The event type will be saved when you save/update the whole form.
            </div>
            <div>
                The notifications for these ignored event types are <strong>supressed</strong> when a new Tip of the same type is received.
            </div>
            <div>
                e.g. you can add event type <strong>info</strong> to stop receiving emails when system receives a new tip for this project with type = <strong>info</strong>.
            </div>
            <div>
                The tip will still be stored in the database and will be part of the Tips visible on the View Tips page. 
            </div>
        </>
    )
}

export const ProjectMembersInfoModalContent = () => {
    return (
        <>
            <div>
                Add your team members here who need to be notified of new tips. 
            </div>
            <div>
                Team members can view Tips & get notified of new Tips related to this project.
            </div>
            <div>
                Members need to register the first time they come to the site. Registration is not required to receive notifications.
            </div>
        </>
    )
}


export const OriginInfoModalContent = () => {
    return (
        <>
            <div>
                Allowed Origins are URLs that will be allowed to make requests to Tipoff 
                Server's Add Tip API (in conjunction with CORS).
            </div>
            <div>
                By default, Add Tip requests will be allowed from all domains. 
            </div>
            <div>
                This field allows you to restrict the incoming requests to selected domains only.
            </div>
            <div>
                You can specify multiple domains. After entering each domain click on add button to add next domain.
            </div>
            <div>
                The origin must match the protocol(http or https) exactly e.g. http://localhost:3000 or https://www.mysite.com
            </div>
        </>
    )
}