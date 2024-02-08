const fs = require("fs");
const src_csv_path = "./src/23Q4需求.csv";

let src_csv = fs.readFileSync(src_csv_path, { encoding: "utf8" });

let tmp_arr = src_csv.split(/[(\r\n)\r\n]+/);
let story_arr = [];
let story_th = tmp_arr[0].split(',');
story_th[7] = 'id';

tmp_arr.forEach((story) => {
  story = story.replace("/", "");
  story = story.split(",");
  let story_obj = {}
  for (let i = 0; i < story.length; i++) {
    story_obj[story_th[i]] = story[i]
    story_arr.push(story_obj)
  }
});

fs.writeFileSync(
  "./res/story.json",
  JSON.stringify({ story: story_arr }),
  "utf8"
);
