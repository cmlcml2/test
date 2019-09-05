import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-schedule-device',
  templateUrl: './schedule-device.component.html',
  styleUrls: ['./schedule-device.component.scss']
})
export class ScheduleDeviceComponent implements OnInit, OnChanges {

  next = false;
  // devices = [];
  devices = [
    {
      id: 363,
      deviceType: 'SENSOR',
      deviceId: '70-b3-d5-49-99-cd-a5-2f'
    },
    {
      id: 364,
      deviceType: 'SENSOR',
      deviceId: '70-b3-d5-49-9c-80-e7-34'
    }
  ];
  formDevice: FormGroup;

  comment = [];

  @Output() changed = new EventEmitter();

  @Input() campaign;
  // private _campaign;

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar) {

    this.formDevice = this.fb.group({
      devices: new FormArray([])
    });

    // this.addCheckboxes();
  }


  ngOnInit() {
  }


  private addCheckboxes() {
    this.devices.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      // console.log(control);
      (this.formDevice.controls.devices as FormArray).push(control);
    });
    // console.log(this.formDevice);

    // console.log(this.comment);
  }

  ngOnChanges(changes: SimpleChanges) {
    const campaign: SimpleChange = changes.campaign;
    // console.log('prev value: ', campaign.previousValue);
    // console.log('got name: ', campaign.currentValue);
    this.campaign = campaign.currentValue;
    if (this.campaign != null) {
      this.initFormDevice();
    }
  }

  initFormDevice() {
    this.next = true;
    this.service.getCampaignDeviceNotAttached(this.campaign.id).subscribe(res => {
      console.log(res);
      if (res.code === 'OK') {
        this.devices = res.data;
        this.addCheckboxes();

      } else if (res.code === 'NOK') {
        console.log(res);
      } else {
        console.log(res);
      }
    }, error => {
      console.log(error);
    });
  }

  onSubmitDevice() {
    console.log('submited');
    const selectedOrderIds = this.formDevice.value.devices
      .map((v, i) => v ? this.devices[i] : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);

    this.rattachementDeviceCampaign(selectedOrderIds);
  }

  rattachementDeviceCampaign(data) {

    const dataTpm = {
      campaignId: this.campaign.id,
      devicesCreate: data,
      devicesDelete: null
    };
    console.log(dataTpm);
    this.service.rattachementDeviceCampaign(dataTpm).subscribe(res => {
      console.log(res);
      if (res.code === 'OK') {
        this.snackBar.open('Device linked !', 'Close', {
          duration: 3000,
          panelClass: ['info-snackbar']
        });

        this.router.navigate(['/']);

      }
    });
  }
  checkCheckBoxvalue(event, i) {
    console.log(event);
  }
}
