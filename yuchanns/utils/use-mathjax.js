import { useEffect } from 'react'

const waitForGlobal = (name, timeout = 300) => {
    return new Promise((resolve, reject) => {
        let waited = 0

        const wait = interval => {
        setTimeout(() => {
            waited += interval
            // some logic to check if script is loaded
            // usually it something global in window object
            if (window[name] !== undefined) {
            return resolve()
            }
            if (waited >= timeout * 1000) {
            return reject({ message: 'Timeout' })
            }
            wait(interval * 2)
        }, interval)
        }

        wait(30)
    })
}

export const useMathJax = () => {
    return useEffect(() => {
        waitForGlobal('MathJax').then(() => {
            window.MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['[', ']']],
                processEscapes: true,
                processEnvironments: true,
                skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                TeX: {
                equationNumbers: { autoNumber: 'AMS' },
                extensions: ['AMSmath.js', 'AMSsymbols.js'],
                },
            },
            })
        })
        if (window.MathJax != null) {
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
        }
        return () => {
            if (window.MathJax != null) {
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
            }
        }
    })
}