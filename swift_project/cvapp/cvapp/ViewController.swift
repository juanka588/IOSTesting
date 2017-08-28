//
//  ViewController.swift
//  cvapp
//
//  Created by juan on 25/08/17.
//  Copyright © 2017 juan. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var messageLabel: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


    @IBAction func stopRecord(_ sender: Any) {
        messageLabel.text="Tap to record"
    }
    
    @IBAction func startRecord(_ sender: Any) {
        messageLabel.text="recording..."
    }
}

