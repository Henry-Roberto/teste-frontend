import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Person } from 'src/app/core/models/Person.model';
import { PersonService } from 'src/app/core/services/person/person.service';

@Component({
  selector: 'app-dev-form',
  templateUrl: './dev-form.component.html',
  styleUrls: ['./dev-form.component.scss']
})
export class DevFormComponent implements OnChanges {
  @Input() dev: Person = new Person('', '', '');
  @Output() devCreated = new EventEmitter<Person>();

  devForm: FormGroup;
  loginGithubIsLoading = false;
  saveOrUpdateIsLoading = false;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private http: HttpClient
  ) {
    this.devForm = this.createForm(this.dev);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dev']) {
      this.devForm = this.createForm(this.dev);
    }
  }

  private createForm(dev: Person): FormGroup {
    const _id = dev._id
      ? [dev._id, []]
      : null;

    return this.fb.group({
      githubUser: [dev.githubUser],
      _id,
      name: [dev.name, [Validators.required, Validators.minLength(3)]],
      email: [dev.email, [Validators.required, Validators.email]],
      createdAt: [dev.createdAt],
      updatedAt: [dev.updatedAt],
      city: [dev.city],
      training: [dev.training],
      technologies: [dev.technologies],
      avatarUrl: [dev.avatarUrl],
    });
  }

  async saveOrUpdate() {
    if (!this.isFormValid()) {
      alert('Preencha os campos corretamente!');
      return;
    }

    this.toggleSaveOrUpdateIsLoading();

    const githubUserIsValid = await this.githubUserIsValid();
    if (!githubUserIsValid) {
      this.toggleSaveOrUpdateIsLoading();
      return;
    }

    if (this.dev._id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.personService.createPerson(this.devForm.value).subscribe((data) => {
      this.resetForm(data);
      this.toggleSaveOrUpdateIsLoading();
    });
  }

  update() {
    this.personService.updatePerson(this.devForm.value).subscribe((data) => {
      this.resetForm(data);
      this.toggleSaveOrUpdateIsLoading();
    });
  }

  async loginGithub() {
    this.toggleLoginGithubLoading();

    const username = this.devForm.get('githubUser')?.value;
    if (!username) {
      alert('Digite um usuário do GitHub!');
      this.toggleLoginGithubLoading();
      return;
    }

    const user = await this.getGithubUser(username);

    if (user) {
      this.devForm.patchValue({
        avatarUrl: user.avatar_url,
        name: user.name,
        city: user.location,
      });
    }

    this.toggleLoginGithubLoading();
  }

  async getGithubUser(username: string): Promise<any> {
    try {
      const user: any = await firstValueFrom(this.http.get(`https://api.github.com/users/${username}`));
      if (!user?.id) {
        alert('Usuário do GitHub não encontrado!');
      }

      return user;
    } catch (error) {
      alert('Erro ao buscar usuário do GitHub!');
      return null;
    }
  }

  private async githubUserIsValid(): Promise<boolean> {
    const githubUser = this.devForm.get('githubUser')?.value;

    if (!githubUser) {
      return true;
    }

    const user = await this.getGithubUser(githubUser);
    if (user?.id) return true;

    return false;
  }

  private toggleLoginGithubLoading() {
    this.loginGithubIsLoading = !this.loginGithubIsLoading;
  }

  private toggleSaveOrUpdateIsLoading() {
    this.saveOrUpdateIsLoading = !this.saveOrUpdateIsLoading;
  }

  private isFormValid(): boolean {
    return this.devForm.valid;
  }

  cancel() {
    this.resetForm();
  }

  private resetForm(data?: Person) {
    if (data) this.devCreated.emit(data);
    this.dev = new Person('', '', '');
    this.devForm.reset();
  }
}
