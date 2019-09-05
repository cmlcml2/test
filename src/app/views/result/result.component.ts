import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import Chart from 'chart.js';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  modeDebug = environment.DEBUG;
  returnDate = UtilService.returnDate;
  getSiteLabel = UtilService.getLabelSite;
  roundedNumber = UtilService.returnRoundNumber;

  id;
  campaign;

  chartTmp1: Chart;

  selectOptions = [];
  selectedOption: string;

  // Filtre sur les dates
  myFilter: any;
  form: FormGroup;
  currentDate = new Date();
  currentPreviousDate: Date;

  // Permet d'avoir un adaptatif en fonction de la taille de l'écran
  mobile = false;
  chartRow = '5:2';

  loading = false;

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private fb: FormBuilder,


  ) { }


  ngOnInit() {
    if (window.screen.width === 320 || window.innerWidth <= 575) { // 768px portrait
      this.mobile = true;
    }
    if (this.mobile) {
      this.chartRow = '1:1';
    }

    this.id = this.route.snapshot.paramMap.get('id');
    this.getCampaign();

    this.myFilter = (d: Date): boolean => {
      const day = d.getDay();
      return day !== 0 && day !== 6;
    };

    this.form = this.fb.group({
      dateStart: [{ value: '' }, Validators.required],
      dateEnd: [{ value: '', disabled: true }, Validators.required],
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

  getCampaign() {
    this.service.getDetailCampaign(this.id).subscribe(res => {
      this.campaign = res.data;

      // Permet de regen le DOM car sinon l'ID pour créer le chart n'est pas trouvé
      this.changeDetector.detectChanges();

      this.getLineChart();

    });
  }

  doSomething(e) {
    this.chartTmp1.options.scales.xAxes[0].ticks.min = this.selectedOption;

    this.chartTmp1.data.datasets[0].data = [0];
    console.log(this.chartTmp1.options.scales.xAxes[0].ticks.min);
    this.chartTmp1.destroy();
    this.getLineChart();
  }

  getLineChart() {
    const ctx10 = document.getElementById('lineChart');
    const label = [];
    const am = [];
    const pm = [];
    Object.keys(this.campaign.result.byDates).forEach(key => {
      label.push(key);
      am.push((this.campaign.result.byDates[key].seatAMOccupied / this.campaign.result.byDates[key].totalSeatAM) * 100);
      pm.push((this.campaign.result.byDates[key].seatPMOccupied / this.campaign.result.byDates[key].totalSeatPM) * 100);
    });

    this.selectOptions = [];
    for (let i = 10; i < label.length + 9; i = i + 10) {
      this.selectOptions.push(i);
    }
    this.selectedOption = this.selectedOption == null ? this.selectOptions[this.selectOptions.length - 1] : this.selectedOption;

    this.chartTmp1 = new Chart(ctx10, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: 'Matin',
          data: am,
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 1
        },
        {
          label: 'Après-midi',
          data: pm,
          backgroundColor: 'rgba(30, 17, 69, 0.1)',
          borderColor: 'rgba(30, 17, 69, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
            // stacked: true
          }],
          xAxes: [{
            ticks: {
              // Affiche seulement les selectedOption dernieres valeurs
              min: label[label.length - parseInt(this.selectedOption, 10)]
            },
          }]
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (tooltipItems, data) => {
              const labelLine = data.datasets[tooltipItems.datasetIndex].label || '';
              return labelLine + ' : ' + tooltipItems.yLabel + '%';
            }
          }

        }
      }
    });
  }

  onSubmit() {
    const data = {
      campaignId: this.campaign.id,
      dateStart: moment(this.form.value.dateStart).add(12, 'hours').toISOString(),
      dateEnd: moment(this.form.value.dateEnd).toISOString(),
    };
    this.loading = true;
    this.service.getDetailCampaignWithDates(data).subscribe(res => {
      console.log(res);
      this.campaign = res.data;
      this.chartTmp1.destroy();
      this.getLineChart();
      this.loading = false;

    }, error => {

      console.log(error);
      this.loading = false;

    });
  }
}
