import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeManageCampaignComponent } from './home-manage-campaign.component';

describe('HomeManageCampaignComponent', () => {
  let component: HomeManageCampaignComponent;
  let fixture: ComponentFixture<HomeManageCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeManageCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeManageCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
