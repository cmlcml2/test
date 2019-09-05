import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import * as moment from 'moment';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  // Premier Form
  myFilter: any;
  form: FormGroup;
  currentDate = new Date();
  currentPreviousDate: Date;
  sites = JSON.parse(sessionStorage.getItem('sites'));
  createdCampaign;

  next = false;

  constructor(
    private service: ApiService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Prevent Saturday and Sunday from being selected.
    this.myFilter = (d: Date): boolean => {
      const day = d.getDay();
      return day !== 0 && day !== 6;
    };

    this.form = this.fb.group({
      title: ['', Validators.required],
      dateStart: [{ value: '' }, Validators.required],
      dateEnd: [{ value: '', disabled: true }, Validators.required],
      comment: [''],
      site: ['', Validators.required],
    });

    this.valueDateChangeTrigger();

  }

  // Permet de débloquer et calculer la date max de la dateEnd en fonction de la dateStart
  valueDateChangeTrigger(): void {
    this.form.get('dateStart').valueChanges.subscribe(val => {
      if (val !== null && val !== '') {
        this.form.get('dateEnd').enable();
        this.form.get('dateEnd').setValue('');
        this.currentPreviousDate = val;
      } else {
        this.form.get('dateEnd').disable();
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      const campaignTmp = {
        libelle: this.form.value.title,
        site: this.form.value.site,
        date_start: moment(this.form.value.dateStart).toISOString(),
        date_end: moment(this.form.value.dateEnd).add(1, 'day').toISOString(),
        comments: this.form.value.comment
      };
      console.log('submited !');
      console.log(campaignTmp);

      this.createCampaign(campaignTmp);

    } else {
      console.log('notValid');
    }
  }

  createCampaign(data) {
    this.service.createCampaign(data).subscribe(res => {
      if (res.code === 'OK') {
        console.log(res.data);
        this.snackBar.open('Campaign created !', 'Close', {
          duration: 3000,
          panelClass: ['info-snackbar']
        });
        this.createdCampaign = res.data;
        this.next = true;
      } else if (res.code === 'NOK') {
        console.log(data);
        this.snackBar.open(res.data, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } else {
        console.log(res);
      }
    }, error => {
      console.log(error);
    });
  }

}
