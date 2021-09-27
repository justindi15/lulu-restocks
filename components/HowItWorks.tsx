
const steps = [
    {
        title: "Step 1",
        message: "Copy the URL of an item with a size and colour into the search bar above."
    },
    {
        title: "Step 2",
        message: "Enter your email or phone number for us to send notifications to."
    },
    {
        title: "Step 3",
        message: "Verify your email address."
    },
    {
        title: "Step 4",
        message: "And done! We'll keep a lookout for restocks on your item and send you a notification."
    },
]

export const HowItWorks = () => {
    return (
        <section id="about" className="max-w-4xl mx-auto text-center mb-52">
            <hr className="mb-20 text-gray-800 font-extrabold"/>
            <span className="font-bold text-3xl text-center max-w-lg text-gray-900">{"How does it work?"}</span>
            {steps.map((step, index) => (
                <div className="flex flex-col" key={index.toString()}>
                    <span className="mt-6 text-md font-bold text-gray-900">{step.title}</span>
                    <span className="mt-6 text-gray-900">{step.message}</span>
                </div>
            ))}
        </section>
    )
}