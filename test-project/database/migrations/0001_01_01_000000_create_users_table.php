<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('username')->unique();
        $table->string('email')->unique()->nullable();
        $table->string('password');
        $table->enum('role', ['super_admin', 'admin'])->default('admin');
        $table->boolean('is_active')->default(true);
        $table->rememberToken();
        $table->timestamps();
    });
}
};
