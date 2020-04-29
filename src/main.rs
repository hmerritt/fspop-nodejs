extern crate yaml_rust;

use std::io::prelude::*;
use std::fs::read_to_string;
use yaml_rust::{Yaml, YamlEmitter, YamlLoader};

fn main() {

    //  Load yaml file as string
    let fcontents = read_to_string("../structures/personal.yml").expect("Unable to read the file");

    //  Parse yaml
    let parsed = YamlLoader::load_from_str(&fcontents).unwrap();
    let config = &parsed[0];

    assert_eq!(config["structure"][1]["media"][0].as_str().unwrap(), "films");

    println!("{:?}", config["structure"]);

    //do_it(doc["structure"]);


}

// fn do_it(map: &mut yaml::Hash) {
//     for (key, value) in &*map {
//         println!("{} / {}", key, value);
//     }
//     map.clear();
// }
//fn dirbootstrap(struct: Array, rootdir)
