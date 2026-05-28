import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Person, PersonService } from '../person.service';
import { Organization, OrganizationService } from '../organization.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-organization-details',
  standalone: true,
  imports: [NgIf, FormsModule, AsyncPipe, NgFor, RouterLink, DatePipe],
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.css'
})
export class OrganizationDetailsComponent implements OnInit {
  org: Organization = {
    id: undefined as (number | undefined),
    name: '',
    createdAt: new Date(),
    updatedAt: undefined as (Date | undefined),
    persons: [] as Person[]
  };

  isNew: boolean = false;

  constructor(private route: ActivatedRoute, private personService: PersonService, private organizationService: OrganizationService, private router: Router, private logService: LogService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const orgIdParam = routeParams.get('orgId');

    if (orgIdParam === 'new') {
      this.isNew = true
    } else if (typeof orgIdParam === 'string') {
      const orgId = parseInt(orgIdParam)
      this.organizationService.fetchById(orgId).then(org => {
        this.org = org
        this.isNew = false
      })

    }
  }

  saveOrg() {
    this.logService.sendLogToBackend('INFO', `L'utilisateur a cliqué sur Save pour l'organisation : ${this.org.name}`);
    this.organizationService.save({
      ...this.org
    }).then(o => {
      this.org = o
      if (this.isNew) {
        this.router.navigate(["organizations", o.id])
      }
    }).catch(error => {
      this.logService.sendLogToBackend('ERROR', `Échec de la sauvegarde de l'organisation ${this.org.name}`);
    })
  }

  deleteOrg() {
    if (this.org.id === undefined) return
    this.logService.sendLogToBackend('WARN', `L'utilisateur a cliqué sur Delete pour l'organisation ID : ${this.org.id}`);
    this.organizationService.deleteById(this.org.id).then(() => {
      this.router.navigate([""])
    })
  }
}
