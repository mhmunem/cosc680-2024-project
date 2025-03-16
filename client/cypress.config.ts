import { defineConfig } from "cypress";


export default defineConfig({
    // setupNodeEvents can be defined in either
    // the e2e or component configuration
    e2e: {
        baseUrl: "http://client:5173/",
        setupNodeEvents(on, _) {
            on('task', {
                log(message) {
                    console.log(message)

                    return null
                },
            })
        },
    },
})
