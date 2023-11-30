module.exports = {
    projects: [
        {
            displayName: { name: 'dom', color: 'blue' },
            testEnvironment: 'jsdom',
            testMatch: ["**/?(*.)+(test).[j]s?(x)"]
        },
        {
            displayName: { name: 'node', color: 'grey' },
            testEnvironment: 'node',
            testMatch: [
                "**/?(*.)+(spec).[j]s?(x)"
            ]
        },
    ],
};