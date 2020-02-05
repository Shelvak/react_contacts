class Api::V1::ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :edit, :update, :destroy]

  def index
    @contacts = Contact.filtered_list(params[:q]).page(params[:page])

    render json: { data: @contacts, pagination: pagination_info }
  end

  def show
    render json: @contact
  end

  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      render json: @contact
    else
      render json: { errors: @contact.json_errors }
    end
  end

  def update
    if @contact.update(contact_params)
      render json: @contact
    else
      render json: { errors: @contact.json_errors }
    end
  end

  def destroy
    if @contact.destroy
      render json: {}
    else
      render json: { errors: @contact.json_errors }
    end
  end

  private

    def set_contact
      @contact = Contact.find(params[:id])
    end

    def contact_params
      params.require(:contact).permit(:first_name, :last_name, :email, :phone)
    end

    def pagination_info
      {
        current:  @contacts.current_page,
        next:     @contacts.next_page,
        per_page: @contacts.limit_value,
        previous: @contacts.prev_page,
        pages:    @contacts.total_pages,
        count:    @contacts.total_count
      }
    end
end
