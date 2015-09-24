# dynadock
A tool for building Dockerfiles dynamically

### Installation
`npm install -g`

### Creating a dynadock script
Dynadock scripts are just Node JS modules. See our example hello world script below

```
var exports = module.exports;

exports.build = function (docker, args){
    var time = new Date();
    docker.from("ubuntu");
    docker.maintainer("Matt Hayward <matt@matthayward.com.au>");
    docker.run(["echo","Hello world"]);
    //Lets echo the time when the dockerfile was generated
    docker.run(["echo",time]);
    docker.build(["-t","hello-world"]);
}
```

### Running a dynadock script
`dynadock script.js [args]`
