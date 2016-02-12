class User < ActiveRecord::Base
  validates(
    :username,
    :password_digest,
    :session_digest,
    presence: true
  )
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, :session_digest, uniqueness: true
  has_many :todos
  after_initialize :ensure_session_digest

  attr_accessor :password

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_digest
    token = SecureRandom::urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_digest
    self.session_digest = User.generate_session_digest
    self.save!
    self.session_digest
  end

  def ensure_session_digest
    self.session_digest ||= User.generate_session_digest
  end
end
