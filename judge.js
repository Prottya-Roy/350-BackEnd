const {exec} = require('child_process');
const fs = require('fs');

const compare = (userOutput, judgeOutput) => {
    let userBuffer = fs.readFileSync(userOutput);
    let judgeBuffer = fs.readFileSync(judgeOutput);
    console.log(userBuffer);
    console.log(judgeBuffer);
    return (userBuffer.toString() === judgeBuffer.toString() ? 0 : -1 );

}

exports.check = (pid, tid, folderUrl, timeLimit, next) => {
    console.log("Judging: ",pid, tid, folderUrl, timeLimit  );
    const input = "../350-storage/"+pid+"/"+tid+"/input.txt";
    const output = "../350-storage/"+pid+"/"+tid+"/output.txt";
    const result = folderUrl+'/result.txt';
    exec('g++ -std=c++17 '+folderUrl+'/source.cpp -o ../350-storage/out.exe && timeout '+timeLimit+'s ../350-storage/out.exe < ./'+input+' > ./'+result,
     (err, stdout, stderr) => {
        if(err) {
            //err.code: 136-re  124-tle 1-ce
            // console.log("error: ",stderr,":::", err.code);
            next(tid, err.code);
        } else{
            // console.log("Success: ",stdout);
            next(tid, compare(result, output));
        } 
    });

    


}