const fs = require("fs");
/** @type {import('next').NextConfig} */
const nextConfig = {
    target: 'server',
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
        removeConsole: process.env.NODE_ENV === 'production'?true:false,
    },
    experimental: {
        // scrollRestoration: true,
    },
    images: {
        domains: ["d2jbshxkjdydpu.cloudfront.net"],
    },
    webpack: config => {
        createDirs([DIR_PREFIX + DIR_GROUPS + "/" + DIR_CREATE_POST])
        copyPageToDirs(
            fs.readdirSync(DIR_PREFIX + DIR_CREATE_POST)
                .map(page => DIR_PREFIX + DIR_CREATE_POST + "/" + page),
            [DIR_GROUPS + "/" + DIR_CREATE_POST]
        )
        return config
    }
};
const DIR_PREFIX = "src/pages/"
const DIR_GROUPS = "groups/[groupName]/[groupId]"
const DIR_CREATE_POST = "create-post"

function createDirs(dirs = []) {
    dirs.forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, (err) => {
                if (err) throw err;
                console.log(err);
            })
        }
    })
}

function copyPageToDirs(pages, dirs = []) {
    pages.forEach(page => {
        dirs.forEach((dir) => {
            fs.copyFile(
                String(page),
                String(page).replace(DIR_CREATE_POST, dir),
                (err) => {
                    if (err) throw err;
                    console.log(err);
                })
        })
    })

}

module.exports = nextConfig;
